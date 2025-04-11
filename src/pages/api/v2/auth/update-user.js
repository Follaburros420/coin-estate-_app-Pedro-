import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import prisma from '@/libs/prisma';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Missing or invalid token.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const latestValues = req.body;

    // Validate the Bearer token

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }

    // Find user by token and check expiration
    const user = await prisma.user.findFirst({
      where: {
        id: { gte: new Date() },
      },
    });

    console.log('🚀 ~ handler ~ user:', user);
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        username: user.username,
        listHash: hashedPassword,
        destinationValues: user.destinationValues,
        userTokens: user.userTokens,
        destinationCalculation: user.destinationCalculation,
        phone: user.phone,
        termsAcceptedPolicy: user?.termsAcceptedPolicy,
        termsAcceptedServices: user?.termsAcceptedServices,
        // password: hashedPassword,
        image: latestValues.image || user?.image || null,
        dateOfBirth: user?.dateOfBirth || null,
        nationality: user?.nationality || null,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
