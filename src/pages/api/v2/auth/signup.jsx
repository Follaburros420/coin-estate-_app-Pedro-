import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import { ethers } from 'ethers';
import crypto from 'crypto';

const ENCRYPTION_KEY = crypto.createHash('sha256').update(process.env.FORGOT_PASSWORD_KEY).digest(); // Derive 32-byte key
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password, username } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate Ethereum wallet
  const wallet = ethers.Wallet.createRandom();
  const destinationCalculation = encrypt(wallet.privateKey);
  const destinationValues = encrypt(wallet.address);

  // Create new user in the database
  const newUser = await prisma.user.create({
    data: {
      email,
      username: username,
      listHash: hashedPassword,
      destinationValues: destinationValues,
      destinationCalculation: destinationCalculation,
    },
  });

  const userRecords = {
    userId: newUser?.id,
    email,
    username,
    address: wallet.address,
  };

  const newUserRecords = await prisma.userRecords.create({
    data: userRecords,
  });

  res.status(200).json({
    message: 'User created',
    user: { email: newUser.email, newUserRecords },
  });
}
