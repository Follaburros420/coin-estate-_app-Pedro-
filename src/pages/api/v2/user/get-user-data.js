import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';

const calculateTotal = (array, field) => {
  return array.reduce((total, item) => total + (item[field] || 0), 0);
};
function getPropertyPayments(propertyId, payments) {
  const properties = payments.filter((payment) => payment.propertyId === propertyId);
  return{
    properties,
    remaning:calculateTotal(properties,'amount')
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

      // Fetch blogs and items
      const user = await prisma.User.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          createdAt: true,
          userTokens: true,
        },
      });
      const properties = await prisma.property.findMany();
      const completePaymentList = await prisma.payment.findMany();
      const payments = await prisma.payment.findMany({ where: { userId: decoded.userId } });
      const transcations = await prisma.transaction.findMany({ where: { userId: decoded.userId } });

      const totalInvest = calculateTotal(payments, 'amount');

      const propertyList = [];
      // const transactionList =
      properties?.map((property) => {
        if (user?.userTokens?.includes(property?.id)) {
          propertyList.push(property);
        }
      });

      // const values = properties.map((property) =>
      //   payments.map((item) => {
      //     if (item.propertyId === property.id) {
      //       return { item, property };
      //     }
      //   }),
      // );
      const valueslatest = properties.map((property) => getPropertyPayments(property.id, completePaymentList));

      const userData = {
        ...user,
        totalInvest,
        invest: { transcations, payments },
        userProperties: propertyList,
        values: properties,
        valueslatest,
      };

      // Map blogs to their respective items

      res.status(200).json({ message: 'fetched successfully', data: userData });
    } catch (error) {
      console.error('Error fetching blogs:', error);

      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Unauthorized. Token has expired.' });
      }

      res.status(500).json({ error: 'Failed to fetch blogs. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
