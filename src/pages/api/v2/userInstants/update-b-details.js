import prisma from '@/libs/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }

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

    const { id } = req.body; // Extract `id` from request body
    if (!id) {
      return res.status(400).json({ error: 'Payment ID is required.' });
    }

    // Find the payment record
    const payment = await prisma.payment.findUnique({
      where: { id },
      // select: { id: true, userId: true, status: true },
    });

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      // select: { id: true, userId: true, status: true },
    });
    console.log({ payment, user });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found.' });
    }

    if (payment.userId !== decoded.userId) {
      return res.status(403).json({ error: 'Unauthorized. You do not own this payment.' });
    }

    if (payment.status === 'COMPLETE') {
      return res.status(400).json({ error: 'Payment is already complete.' });
    }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: id },
      data: {
        userId: payment.userId,
        amount: payment.amount,
        currency: payment.currency,
        paymentIntentId: payment.paymentIntentId,
        status: 'SECCESS',
        propertyId: payment.propertyId,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        email: user?.email,
        listHash: user?.listHash,
        destinationValues: user?.destinationValues,
        destinationCalculation: user?.destinationCalculation,
        userTokens: [...user?.userTokens, payment?.propertyId],
      },
    });

    // Respond with success
    res.status(200).json({
      message: 'Transaction Complete updated successfully.',
      payment: updatedPayment,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating payment status:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized. Token has expired.' });
    }

    res.status(500).json({
      error: 'Failed to update payment status. Please try again later.',
    });
  }
}
