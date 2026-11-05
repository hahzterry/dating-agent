
import app from '../server/src/app.js';
import { connectDb } from '../server/src/lib/connectDb.js';

export default async function handler(req, res) {
  try {
    const pathname = new URL(
      req.url,
      'http://localhost'
    ).pathname;

    // Public health endpoint
    if (pathname === '/api/health') {
      return res.status(200).json({
        ok: true,
        application: 'Zodiac DatN',
        platform: 'Vercel'
      });
    }

    await connectDb();

    return app(req, res);
  } catch (error) {
    console.error(
      'Zodiac DatN API error:',
      error
    );

    if (!res.headersSent) {
      return res.status(503).json({
        error: 'Service temporarily unavailable'
      });
    }
  }
}
