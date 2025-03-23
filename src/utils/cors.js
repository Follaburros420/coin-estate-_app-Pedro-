import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  origin: [
    'http://localhost:3000',
    process.env.REFERRER_WEBSITE || 'https://coin-estate.vercel.app/'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors; 