import { MongoClient } from 'mongodb';

// Configuración de MongoDB
const MONGODB_URI = process.env.DATABASE_URL;
const MONGODB_DB = process.env.MONGODB_DB || 'coinestate';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cop } = req.body;

      // Validación mejorada
      if (!cop || isNaN(cop)) {
        return res.status(400).json({ 
          error: 'Valid COP value is required.',
          details: 'Please provide a valid number for the COP exchange rate.'
        });
      }

      console.log('Creating exchange rate entry:', { cop });

      // Conectar a MongoDB directamente
      const { db } = await connectToDatabase();
      
      // Crear timestamp único
      const timestamp = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Insertar directamente en MongoDB sin Prisma
      const exchangeRateCollection = db.collection('ExchangeRate');
      const newEntry = await exchangeRateCollection.insertOne({
        timestamp: timestamp,
        cop: parseFloat(Number(cop).toFixed(2)),
        createdAt: new Date(),
      });

      console.log('Exchange rate created successfully:', newEntry.insertedId);
      
      return res.status(200).json({ 
        success: true, 
        data: {
          id: newEntry.insertedId,
          timestamp: timestamp,
          cop: parseFloat(Number(cop).toFixed(2)),
          createdAt: new Date()
        },
        message: 'Exchange rate saved successfully'
      });
      
    } catch (error) {
      console.error('Error saving exchange rate data:', error);
      
      // Manejo de errores específicos de MongoDB
      if (error.message && error.message.includes('connection')) {
        return res.status(503).json({ 
          error: 'Database connection failed',
          details: 'Unable to connect to the database. Please try again later.',
          code: 'DATABASE_CONNECTION_ERROR'
        });
      }
      
      if (error.code === 11000) {
        return res.status(409).json({ 
          error: 'Duplicate entry detected',
          details: 'An exchange rate with this timestamp already exists. Please try again.',
          code: 'DUPLICATE_TIMESTAMP'
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to save exchange rate data',
        details: 'Please try again later or contact support if the issue persists.',
        originalError: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: `Method ${req.method} not allowed`,
      details: 'Only POST requests are supported for this endpoint.'
    });
  }
}
