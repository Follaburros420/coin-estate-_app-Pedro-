import prisma from '@/libs/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test simple de conexión
    await prisma.$connect();
    
    // Test básico sin operaciones complejas
    const result = await prisma.$runCommandRaw({ ping: 1 });
    
    res.status(200).json({
      success: true,
      message: 'Conexión a MongoDB exitosa desde Vercel',
      result: result,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
    
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    res.status(500).json({
      success: false,
      message: 'Error de conexión a MongoDB',
      error: error.message,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  } finally {
    await prisma.$disconnect();
  }
}
