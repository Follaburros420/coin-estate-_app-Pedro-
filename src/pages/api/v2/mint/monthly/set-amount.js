import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';

const divideAllTransactions = (payments, propertyId) => {
  const daysAgo = 1;
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - daysAgo);

  const recentTransactions = payments.filter((payment) => {
    const createdAt = new Date(payment.createdAt);
    return createdAt >= pastDate && createdAt <= currentDate;
  });
  const users = [
    ...new Set(
      recentTransactions.filter((payment) => payment.propertyId === propertyId).map((payment) => payment.userId),
    ),
  ];
  return { recentTransactions: JSON.stringify(recentTransactions), users };
};

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

      // Ensure required fields are provided
      if (!data.name) {
        return res.status(400).json({ error: 'Name and address are required fields.' });
      }

      const tokenHolders = await prisma.payment.findMany({
        where: {
          // userId: decoded.userId,
          status: 'SECCESS',
        },
      });
      const activeResults = divideAllTransactions(tokenHolders, '67cce8504b9cc313c62f2118');

      // Associate the property with the authenticated user
      const propertyData = {
        ...data,
        userId: decoded.userId, // Include userId from the token
      };

      const content = await prisma.monthlyProcess.create({
        data: propertyData,
      });

      res.status(200).json({ message: 'Monthly Price Updated successfully.', content });
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
