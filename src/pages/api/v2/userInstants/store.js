import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import crypto from 'crypto';
import { tokenAbi, tokenAddress } from "@/contract";

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
    // Validate Bearer token
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

      const { recipient, amount } = req.body;
      const user = await prisma.user.findUnique({ where: { id:decoded.userId } });
      const privateKey = decrypt(user.destinationCalculation)
      console.log({user,privateKey})

      // Validate required fields
      // if (!recipient || !amount) {
      //   return res.status(400).json({ error: "Recipient and amount are required." });
      // }

      // Set up ethers.js with provider and wallet
      const provider = new ethers.providers.JsonRpcProvider(
        // "https://shape-mainnet.g.alchemy.com/v2/352r-cLBBgiYpchoxYaA5lNvID3iEgGT"
        "https://polygon-amoy.g.alchemy.com/v2/352r-cLBBgiYpchoxYaA5lNvID3iEgGT"
      );
      // const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
      const wallet = new ethers.Wallet(privateKey, provider);

      // Define contract details
      const CONTRACT_ADDRESS = tokenAddress;
      const ABI = tokenAbi

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

      // Call smart contract function
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount.toString(), 18)); // Adjust decimals as needed

      console.log("Transaction submitted:", tx.hash);

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);

      // Store transaction details in the database
      const transaction = await prisma.transaction.create({
        data: {
          userId: decoded.userId,
          sender: wallet.address,
          recipient,
          amount,
          transactionHash: receipt.transactionHash,
          status: receipt.status === 1 ? "SUCCESS" : "FAILED", // Status based on transaction receipt
        },
      });

      res.status(201).json({ message: "Transaction completed successfully.", transaction });
    } catch (error) {
      console.error("Error processing transaction:", error);

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized. Token has expired." });
      }

      res.status(500).json({ error: "Failed to process transaction. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
