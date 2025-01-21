import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import crypto from 'crypto';

const ENCRYPTION_KEY = crypto.createHash('sha256').update(process.env.FORGOT_PASSWORD_KEY).digest(); // Derive 32-byte key

function decrypt(text) {
  const [iv, encrypted] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Missing or invalid token." });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      const { email, recipient, amount } = req.body;
      const user = await prisma.user.findUnique({ where: { id:decoded.userId } });
      
      const privateKey = decrypt(user.destinationCalculation)
      
      // Validate the required fields
      if (!privateKey || !recipient || !amount) {
        return res.status(400).json({ error: "Private key, recipient, and amount are required." });
      }
      
      // Validate the amount is positive
      if (isNaN(amount) || parseFloat(amount) <= 0) {
        return res.status(400).json({ error: "Invalid amount. Must be a positive number." });
      }
      
      // Alchemy RPC URL (Ethereum Mainnet)
      const provider = new ethers.providers.JsonRpcProvider(
        // "https://shape-mainnet.g.alchemy.com/v2/352r-cLBBgiYpchoxYaA5lNvID3iEgGT"
        "https://polygon-amoy.g.alchemy.com/v2/352r-cLBBgiYpchoxYaA5lNvID3iEgGT"
      );
      
      // Initialize wallet with the private key
      const wallet = new ethers.Wallet(privateKey, provider);
      
      // Check sender's balance
      const balance = await wallet.getBalance();
      const transferAmount = ethers.utils.parseEther(amount);
      
      if (balance.lt(transferAmount)) {
        return res.status(400).json({ error: "Insufficient funds in the wallet." });
      }
      const gasFees = await provider.getFeeData();

        // If gasFees is undefined or has issues, fall back to default values
        const maxPriorityFeePerGas = gasFees.maxPriorityFeePerGas || ethers.utils.parseUnits("1", "gwei");
        const maxFeePerGas = gasFees.maxFeePerGas || ethers.utils.parseUnits("2", "gwei");
      // Transaction details
      const tx = {
        to: recipient,
        value: ethers.utils.parseEther(amount),
        gasLimit: 21000,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        maxFeePerGas: maxFeePerGas,
        // maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
        // maxFeePerGas: gasPrice.maxFeePerGas,
      };
      
      // Send transaction
      const transaction = await wallet.sendTransaction(tx);
      const receipt = await transaction.wait();
      console.log({decoded,privateKey, user,receipt:JSON.stringify(receipt)})

      // Store the transaction in the database
      await prisma.transaction.create({
        data: {
          userId: decoded.userId,
          sender: wallet.address,
          recipient,
          amount,
          transactionHash: receipt.transactionHash,
          status: "SUCCESS",
        },
      });

      res.status(201).json({
        message: "Funds transferred successfully.",
        transactionHash: receipt.transactionHash,
      });
    } catch (error) {
      console.error("Error transferring funds:", error);

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized. Token has expired." });
      }

      res.status(500).json({ error: "Failed to transfer funds. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}

