import prisma from '@/libs/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Insert data into the database
      const newEntry = await prisma.exchangeRate.findMany();

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
