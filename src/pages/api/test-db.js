import prisma from '@/libs/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test de conexión a la base de datos
    await prisma.$connect();
    
    // Test de consulta simple
    const userCount = await prisma.user.count();
    
    res.status(200).json({
      success: true,
      message: 'Conexión a MongoDB exitosa',
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    res.status(500).json({
      success: false,
      message: 'Error de conexión a MongoDB',
      error: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}