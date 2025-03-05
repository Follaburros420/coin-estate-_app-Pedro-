import prisma from '@/libs/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cop } = req.body;

      // Validate input
      if (!cop) {
        return res.status(400).json({ error: 'Both timestamp and cop value are required.' });
      }
      console.log({ cop });

      // Insert data into the database
      const newEntry = await prisma.exchangeRate.create({
        data: {
          timestamp: `${Date.now()}`, // Store as BigInt
          cop: parseFloat(Number(cop).toFixed(2)), // Format to two decimal places
        },
      });

      return res.status(200).json({ success: true, data: newEntry });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ error: `Failed to save data. Please try again later. ${error}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
