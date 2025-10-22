// Endpoint de respaldo que simula el guardado exitoso
// Útil cuando la base de datos no está disponible
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cop } = req.body;

      // Validación básica
      if (!cop || isNaN(cop)) {
        return res.status(400).json({ 
          error: 'Valid COP value is required.',
          details: 'Please provide a valid number for the COP exchange rate.'
        });
      }

      console.log('Simulating exchange rate save:', { cop });

      // Simular respuesta exitosa sin guardar en BD
      const mockEntry = {
        id: `mock_${Date.now()}`,
        timestamp: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cop: parseFloat(Number(cop).toFixed(2)),
        createdAt: new Date(),
        simulated: true // Indicar que es simulado
      };

      console.log('Exchange rate simulated successfully:', mockEntry.id);
      
      return res.status(200).json({ 
        success: true, 
        data: mockEntry,
        message: 'Exchange rate processed successfully (simulated)',
        warning: 'Data was not saved to database due to connection issues'
      });
      
    } catch (error) {
      console.error('Error in simulated exchange rate:', error);
      
      return res.status(500).json({ 
        error: 'Failed to process exchange rate',
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
