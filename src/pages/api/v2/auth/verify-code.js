import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing or malformed.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if (!decoded?.userId) {
    //   return res.status(401).json({ error: 'Invalid token payload. User ID missing.' });
    // }

    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (!user.verificationCode || !user.resetTokenExpires) {
      return res.status(400).json({ error: 'No active verification code. Please request a new one.' });
    }

    if (new Date() > user.resetTokenExpires) {
      return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
    }

    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

    if (hashedCode !== user.verificationCode) {
      return res.status(400).json({ error: 'Invalid verification code. Please check and try again.' });
    }

    const { id, ...values } = user;

    const userDataValues = await prisma.user.update({
      where: { email },
      data: {
        ...values,
        verified: true,
      },
    });

    const {
      id: ID,
      destinationCalculation,
      destinationValues,
      listHash,
      verificationCode,
      ...otherData
    } = userDataValues;

    return res.status(200).json({ message: 'Email verified successfully.', data: otherData });
  } catch (error) {
    console.error('JWT Verification Error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please log in again.' });
    }

    return res.status(500).json({ error: 'Something went wrong while verifying email. Please try again later.' });
  }
}
