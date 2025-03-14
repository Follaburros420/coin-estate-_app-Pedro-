import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';

// formate Transactions
const groupTransactions = (transactions, users, price, percentage) => {
  const groupedTransactions = {};
  const userSummaries = {};

  transactions.forEach((tx) => {
    const { userId, numberOfTokens, amount, tokenPrice } = tx;

    // Group transactions by userId
    if (!groupedTransactions[userId]) {
      groupedTransactions[userId] = [];
    }
    groupedTransactions[userId].push(tx);

    // Sum numberOfTokens and amount for each user
    if (!userSummaries[userId]) {
      userSummaries[userId] = { totalTokens: 0, totalAmount: 0, tokenPrice };
    }
    userSummaries[userId].totalTokens += numberOfTokens;
    userSummaries[userId].totalAmount += amount;
  });

  const monthlyReward = price;
  const userSummary = { ...userSummaries };

  // const percentage = 10; // Change this value (e.g., 5, 10, 20, etc.)

  // Calculate totalTokens of all users
  // Get user IDs dynamically from `userSummary`
  const userIds = Object.keys(userSummary);

  // Calculate totalTokens of all users
  const totalTokensAllUsers = userIds.reduce((sum, userId) => sum + userSummary[userId].totalTokens, 0);
  let totalDistributed = 0; // Track total earnings distributed

  // Distribute the monthly reward based on totalTokens proportionally  ======= without percentage
  userIds.forEach((userId) => {
    const user = userSummary[userId];
    user.earning = (user.totalTokens / totalTokensAllUsers) * monthlyReward;
    totalDistributed += user.earning;
  });

  // Distribute the monthly reward proportionally based on totalTokens and apply percentage
  // userIds.forEach((userId) => {
  //   const user = userSummary[userId];
  //   const totalEarning = (user.totalTokens / totalTokensAllUsers) * monthlyReward;
  //   user.earning = (totalEarning * percentage) / 100; // Apply the dynamic percentage
  //   totalDistributed += user.earning;
  // });
  // Calculate the remaining balance
  const remainingBalance = monthlyReward - totalDistributed;

  return {
    // user transactions for each property
    // userTransactions: groupedTransactions,
    userSummaries: userSummary,
    remainingBalance,
  };
};

// initial Formate

const divideAllTransactions = (payments, propertyId, price, percentage) => {
  // const daysAgo = 1;
  // const currentDate = new Date();
  // const pastDate = new Date();
  // pastDate.setDate(currentDate.getDate() - daysAgo);

  // const recentTransactionsOfAllUsersFromAllProperties = payments.filter((payment) => {
  //   const createdAt = new Date(payment.createdAt);
  //   return createdAt >= pastDate && createdAt <= currentDate;
  // });
  const daysAgo = 5;
  const now = new Date(); // Current date & time
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(now.getDate() - daysAgo); // Subtract 2 days
  const recentTransactionsOfAllUsersFromAllProperties = payments.filter((txn) => new Date(txn.createdAt) < twoDaysAgo);

  const recentTransactionsOfAllUsers = recentTransactionsOfAllUsersFromAllProperties.filter(
    (payment) => payment.propertyId === propertyId,
  );

  const users = [
    ...new Set(
      recentTransactionsOfAllUsers
        .filter((payment) => payment.propertyId === propertyId)
        .map((payment) => payment.userId),
    ),
  ];
  const groupedTransactions = groupTransactions(recentTransactionsOfAllUsers, users, price, percentage);

  return {
    ...groupedTransactions,
    users,
  };
};

// to update database

async function updateMultipleUsers(userId, dataList) {
  try {
    // Ensure userSummaries is an object with user-specific data
    if (!userId || typeof userId !== 'object') {
      throw new Error('Invalid userSummaries data');
    }

    // Create update queries for each user
    const updateQueries = userId.map((data) => {
      return prisma.userRecords.update({
        where: { id: dataList[data].id },
        data: {
          username: dataList[data].username, // Assign tokenId
          email: dataList[data].email, // Assign tokenId
          address: dataList[data].address, // Assign tokenId
          // earnings: dataList[data].earnings, // Assign tokenId
          userId: data, // Assign tokenId
          properties: dataList[data].properties, // Assign tokenId
        },
      });
    });

    // Run all updates in a single transaction
    const result = await prisma.$transaction(updateQueries);

    return result;
  } catch (error) {
    console.error('Error updating users:', error);
    return { status: false, error };
  } finally {
    await prisma.$disconnect();
  }
}

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

      const userRecordsList = await prisma.userRecords.findMany({});
      const activeResults = divideAllTransactions(tokenHolders, data?.tokenId, data?.price, data?.percentage);

      const remainingAfterDistribution = activeResults?.remainingBalance;

      // Associate the property with the authenticated user
      const propertyData = {
        ...data,
        userId: decoded.userId, // Include userId from the token
      };

      // ================================== monthly Division Process ===============================

      const userIds = activeResults?.users || ['67cff19359645c9d1c30540b', '67d00b3659645c9d1c305413'];
      const userData = userRecordsList.reduce((acc, user) => {
        const properties = JSON.parse(user.properties);
        acc[user.userId] = {
          ...user,
          // earnings: JSON.stringify({ [data?.tokenId]: activeResults?.userSummaries[user.userId] }),
          properties: properties
            ? JSON.stringify({ ...properties, [data?.tokenId]: activeResults?.userSummaries[user.userId] })
            : JSON.stringify({ [data?.tokenId]: activeResults?.userSummaries[user.userId] }),
        };
        return acc;
      }, {});

      // =================================== Division into users ========================================

      const results = await updateMultipleUsers(userIds, userData); // Example update
      if (results.error) {
        res.status(305).json({ error: 'Monthly Price Updated successfully. update', content: results });
      }

      const content = await prisma.monthlyProcess.create({
        data: propertyData,
      });

      res.status(200).json({ message: 'Monthly Price Updated successfully.', content: { results, content } });
    } catch (error) {
      console.error('Failed to Set Monthly Profit:', error);

      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Unauthorized. Token has expired.' });
      }

      res.status(500).json({ error: 'Failed to Set Monthly Profit. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
