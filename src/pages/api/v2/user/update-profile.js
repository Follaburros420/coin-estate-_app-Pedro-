import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Validate the Bearer token
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

      const data = req.body; // Access data from the request body
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
      if (!user) return res.status(400).json({ error: 'This email is not in use.' });
      // Ensure required fields are provided
      // if (!data.name || !data.email) {
      //   return res.status(400).json({ error: 'Name and address are required fields.' });
      // }

      // Associate the property with the authenticated user
      const userData = {
        username: user.username,
        listHash: user.listHash,
        image: user?.image || null,
        destinationValues: user.destinationValues,
        userTokens: user.userTokens,
        destinationCalculation: user.destinationCalculation,
        phone: user.phone,
        termsAcceptedPolicy: user?.termsAcceptedPolicy,
        termsAcceptedServices: user?.termsAcceptedServices,
        // password: hashedPassword,
        dateOfBirth: user?.dateOfBirth || null,
        nationality: user?.nationality || null,
        resetToken: null,
        resetTokenExpires: null,
        ...data, // Include userId from the token
        email: user.email,
      };
      console.log('🚀 ~ handler ~ existingUser:', { user, userData });

      const content = await prisma.user.update({
        where: { id: decoded.userId },
        data: userData,
      });

      res.status(201).json({
        message: 'Profile Update successfully.',
        data: {
          id: content?.id,
          email: content?.email,
          image: content.image,
          username: content?.username,
          dateOfBirth: content.dateOfBirth,
          phone: content.phone,
          nationality: content.nationality,
        },
      });
    } catch (error) {
      console.error('Error creating property:', error);

      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Unauthorized. Token has expired.' });
      }

      res.status(500).json({ error: 'Failed to create property. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
