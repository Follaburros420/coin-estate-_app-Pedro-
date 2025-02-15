import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Validate the Bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ error: 'Unauthorized. Missing or invalid token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      }

      const monthlyValues = await prisma.monthlyProcess.findMany();
      const tokenHolders = await prisma.payment.findMany();
      // const monthlyPriceToken = monthlyValues.map((item) => {
      //   return tokenHolders.filter((transaction) => transaction.propertyId === item.tokenId);
      // });
      // const monthlyPriceToken = monthlyValues.flatMap((item) =>
      //   tokenHolders.filter((transaction) => transaction.propertyId === item.tokenId),
      // );
      const groupedTransactions = monthlyValues.reduce((acc, item) => {
        acc[item.tokenId] = tokenHolders.filter((transaction) => transaction.propertyId === item.tokenId);
        return acc;
      }, {});

      const groupedTransactionsAmount = monthlyValues.reduce((acc, item) => {
        const transactions = tokenHolders.filter((transaction) => transaction.propertyId === item.tokenId);

        acc[item.tokenId] = transactions.reduce((userAcc, transaction) => {
          const { userId, amount } = transaction;
          userAcc[userId] = (userAcc[userId] || 0) + amount; // Sum amounts for the same userId
          return userAcc;
        }, {});

        return acc;
      }, {});

      console.log(groupedTransactions);

      // console.log({ monthlyValues, tokenHolders, LIST:JSON.stringify(groupedTransactions) });

      res
        .status(200)
        .json({ message: 'get monthly recodes', data: { groupedTransactions, groupedTransactionsAmount  } });
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
