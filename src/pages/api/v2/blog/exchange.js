import prisma from '@/libs/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { timestamp, cop } = req.body;

      // Validate input
      if (!timestamp || !cop) {
        return res.status(400).json({ error: 'Both timestamp and cop value are required.' });
      }
      console.log({ timestamp, cop });

      // Insert data into the database
      const newEntry = await prisma.exchangeRate.create({
        data: {
          timestamp,
          cop,
        },
      });

      return res.status(201).json({ success: true, data: newEntry });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ error: `Failed to save data. Please try again later. ${error}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
