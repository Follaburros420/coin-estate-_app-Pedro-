import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';

const distributeFunds = (monthlyValues, tokenHolders) => {
  // Step 1: Group token holders by tokenId and sum their amounts
  const groupedHolders = tokenHolders.reduce((acc, transaction) => {
    if (!acc[transaction.propertyId]) {
      acc[transaction.propertyId] = {};
    }
    if (!acc[transaction.propertyId][transaction.userId]) {
      acc[transaction.propertyId][transaction.userId] = 0;
    }
    acc[transaction.propertyId][transaction.userId] += transaction.amount;
    return acc;
  }, {});

  // Step 2: Calculate the distribution
  const distribution = monthlyValues.reduce((acc, monthlyToken) => {
    const { tokenId, percentage, price } = monthlyToken;

    // If no holders for this tokenId, skip
    if (!groupedHolders[tokenId]) {
      acc[tokenId] = {};
      return acc;
    }

    // Calculate the distributable amount
    const distributableAmount = (percentage / 100) * price;

    // Get total tokens held for this tokenId
    const totalTokens = Object.values(groupedHolders[tokenId]).reduce((sum, value) => sum + value, 0);

    // Calculate each holder's share
    acc[tokenId] = {};
    for (const userId in groupedHolders[tokenId]) {
      acc[tokenId][userId] = (groupedHolders[tokenId][userId] / totalTokens) * distributableAmount;
    }

    return acc;
  }, {});

  return distribution;
};

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

      const data = req.body;

      const monthlyValues = await prisma.monthlyProcess.findMany();
      const tokenHolders = await prisma.payment.findMany();

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

      // const totalAmount = 32;
      // const percentage = 0.03;

      // const distributedAmounts = Object.keys(groupedTransactionsAmount).reduce((acc, tokenId) => {
      //   const holders = groupedTransactionsAmount[tokenId];
      //   const tokenAmount = totalAmount * percentage; // 3% of totalAmount

      //   const totalTokens = Object.values(holders).reduce((sum, value) => sum + value, 0);

      //   acc[tokenId] = Object.keys(holders).reduce((userAcc, userId) => {
      //     console.log({ holders, totalTokens, tokenAmount });
      //     userAcc[userId] = (holders[userId] / totalTokens) * tokenAmount;
      //     return userAcc;
      //   }, {});

      //   return acc;
      // }, {});

      // Example Usage
      const result = distributeFunds(monthlyValues, tokenHolders);

      const userId = '676800b0d4500d3e82649466'; // User we are calculating for

      // Step 1: Calculate user earnings per token
      let totalEarnings = 0;
      const userEarnings = {};
      let totalTokenBalance = 0;

      monthlyValues.forEach(({ tokenId, price, totalPrice }) => {
        if (result[tokenId] && result[tokenId][userId]) {
          const userShare = result[tokenId][userId]; // User's % share of token
          // const earnings = price * userShare; // Calculate earnings for this token
          const earnings = userShare; // Calculate earnings for this token
          console.log({ earnings, price, userShare });
          userEarnings[tokenId] = { earned: earnings, purchased: price, totalPrice };
          totalEarnings += earnings;
          totalTokenBalance += price;
        }
      });

      // Output results
      console.log("User's Token Earnings:", { monthlyValues, userEarnings, totalTokenBalance });
      console.log("User's Total Monthly Earnings:", totalEarnings);

      // console.log({ result });
      // console.log({ groupedTransactions, monthlyValues });

      // console.log({ monthlyValues, tokenHolders, LIST:JSON.stringify(groupedTransactions) });

      res
        .status(200)
        .json({
          message: 'get monthly recodes',
          data: { ...userEarnings, totalEarnings: totalEarnings?.toFixed(4), totalTokenBalance },
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
