import crypto from 'crypto';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  // Hash the provided token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user by token and check expiration
  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpires: { gte: new Date() },
    },
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user and clear reset token fields
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  res.status(200).json({ message: 'Password reset successfully' });
}
