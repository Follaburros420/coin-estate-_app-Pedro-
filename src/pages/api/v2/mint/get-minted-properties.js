import prisma from '@/libs/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Validate the Bearer token
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return res.status(401).json({ error: 'Unauthorized. Missing or invalid token.' });
    // }

    // const token = authHeader.split(' ')[1];

    try {
      // Verify the JWT token
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // if (!decoded || !decoded.userId) {
      //   return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      // }

      // Fetch blogs and items
      const mintedProperties = await prisma.minted.findMany();
      const propertiesList = await prisma.property.findMany();

      const mintedList = [];

      propertiesList.map((item) => {
        mintedProperties.map((mint) => {
          if (item.id === mint.tokenId) {
            mintedList.push({
              ...item,
              mint,
              minted: true,
            });
          } else {
            return null;
          }
        });
      });
      // Map blogs to their respective items

      res.status(200).json({ message: 'fetched successfully', data: mintedList });
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
