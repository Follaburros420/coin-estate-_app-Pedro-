import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

  const sessionExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
  const token = jwt.sign({ userId: user.id, expiresAt: sessionExpiresAt }, JWT_SECRET);

  await prisma.session.create({
    data: { userId: user.id, expiresAt: sessionExpiresAt },
  });

  res.status(200).json({ token, expiresAt: sessionExpiresAt, email });
}
