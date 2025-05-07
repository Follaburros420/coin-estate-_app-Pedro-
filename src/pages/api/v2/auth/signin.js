import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;
const ENCRYPTION_KEY = crypto.createHash('sha256').update(process.env.FORGOT_PASSWORD_KEY).digest(); // Derive 32-byte key

function decrypt(text) {
  const [iv, encrypted] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.listHash);
  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

  const sessionExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
  const token = jwt.sign({ userId: user.id, expiresAt: sessionExpiresAt }, JWT_SECRET);

  await prisma.session.create({
    data: { userId: user.id, expiresAt: sessionExpiresAt },
  });

  const address = decrypt(user.destinationValues);
  const { id, listHash, destinationValues, destinationCalculation, ...userData } = user;

  res.status(200).json(
    {
      message: 'Login Success',
      user: { ...userData, address },
    },
    //   {
    //   token,
    //   expiresAt: sessionExpiresAt,
    //   email,
    //   address: address,
    //   username: user?.username,
    //   phone: user.phone,
    //   termsAcceptedPolicy: user?.termsAcceptedPolicy,
    //   termsAcceptedServices: user?.termsAcceptedServices,
    //   ...userData,
    // }
  );
}
