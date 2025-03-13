import prisma from '@/libs/prisma';

const calculateTotal = (array, field) => {
  return array.reduce((total, item) => total + (item[field] || 0), 0);
};
function getPropertyPayments(propertyId, payments) {
  const paymentList = payments.filter((payment) => payment.propertyId === propertyId);
  return {
    // properties,
    propertyId,
    remaining: calculateTotal(paymentList, 'amount'),
  };
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const properties = await prisma.property.findMany();
      const completePaymentList = await prisma.payment.findMany({
        where: { status: 'SECCESS' },
      });
      const remainingList = properties?.map((property) => getPropertyPayments(property.id, completePaymentList));

      res.status(200).json({ success: true, data: remainingList });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch properties' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
