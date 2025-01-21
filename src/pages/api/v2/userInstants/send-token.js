const { tokenAbi } = require('@/contract');
const { ethers } = require('ethers');

import prisma from '@/libs/prisma';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

async function transferTokens(recipient, CONTRACT_ADDRESS, amount) {
  try {
    // Load environment variables
    // const { PRIVATE_KEY, RPC_URL, CONTRACT_ADDRESS } = process.env;

    // const RPC_URL = 'https://polygon-amoy.g.alchemy.com/v2/352r-cLBBgiYpchoxYaA5lNvID3iEgGT';
    const RPC_URL = 'https://bnb-testnet.g.alchemy.com/v2/gjOpWVwh7CDyPa2g52cxcCeudpPuoAoG';
    const PRIVATE_KEY = process.env.PRIVATE_KEY;

    if (!PRIVATE_KEY || !RPC_URL || !CONTRACT_ADDRESS) {
      throw new Error('Missing values');
    }
    // Set up the provider
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    // Create a wallet instance
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Connect to the contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, tokenAbi, wallet);

    // Convert amount to the correct format (if needed, e.g., decimals)
    const decimals = 18; // Replace with your token's decimals
    const formattedAmount = ethers.utils.parseUnits(amount.toString(), decimals);

    // Call the `transfer` function
    console.log(`Initiating transfer to ${recipient}...`);
    const tx = await contract.adminTransfer(process.env.WALLET_ADDRESS, recipient, 1);
    if (tx) {
      return res.status(401).json({ error: tx });
    }
    console.log('Transfer successful:', { tx });

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    console.log('Transfer successful:', { receipt });
    return {
      success: true,
      transactionHash: receipt.transactionHash,
    };
  } catch (error) {
    console.error('Error during transfer:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

const ENCRYPTION_KEY = crypto.createHash('sha256').update(process.env.FORGOT_PASSWORD_KEY).digest(); // Derive 32-byte key

function decrypt(text) {
  const [iv, encrypted] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Missing or invalid token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      }
      const { amount, tokenAddress } = req.body;
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
      const userAddress = decrypt(user.destinationValues);
      // console.log({ amount, tokenAddress,userAddress, decoded });
      // Validate the amount is positive
      if (isNaN(amount) || parseFloat(amount) <= 0) {
        return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
      }

      // Alchemy RPC URL (Ethereum Mainnet)

      const receipt = await transferTokens(userAddress, tokenAddress, amount);
      console.log({ receipt });

      if (receipt?.error) {
        return res.status(400).json({ error: receipt?.error });
      }

      // Store the transaction in the database
      await prisma.transaction.create({
        data: {
          userId: decoded.userId,
          sender: process.env.WALLET_ADDRESS,
          recipient: userAddress,
          amount,
          transactionHash: receipt.transactionHash,
          status: 'SUCCESS',
        },
      });

      res.status(201).json({
        message: 'Funds transferred successfully.',
        transactionHash: receipt.transactionHash,
      });
    } catch (error) {
      console.error('Error transferring funds:', error);

      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Unauthorized. Token has expired.' });
      }

      res.status(500).json({ error: 'Failed to transfer funds. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
