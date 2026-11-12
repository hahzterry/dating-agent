
import app from '../server/src/app.js';
import { connectDb } from '../server/src/lib/connectDb.js';

// Zodiac DatN — Vercel Serverless API Handler

export default async function handler(req, res) {
  try {
    // Parse the incoming request URL.
    const url = new URL(req.url || '/', 'http://localhost');

    // Read the original route supplied by vercel.json.
    let originalPath = url.searchParams.get('originalPath');

    // Vercel may also expose rewrite parameters in req.query.
    if (originalPath === null && typeof req.query?.originalPath === 'string') {
      originalPath = req.query.originalPath;
    }

    // Restore the original API route after the Vercel rewrite.
    if (originalPath !== null) {
      // Remove leading slashes to avoid malformed paths.
      const cleanPath = originalPath.replace(/^\/+/, '');

      // Remove the internal Vercel rewrite parameter.
      url.searchParams.delete('originalPath');

      // Rebuild the request URL for Express.
      const queryString = url.searchParams.toString();

      req.url = `/api/${cleanPath}${
        queryString ? `?${queryString}` : ''
      }`;
    } else if (url.pathname === '/api/index' || url.pathname === '/api/index/') {
      // Handle requests to the API root.
      req.url = '/api';
    }

    // Determine the restored pathname.
    const pathname = new URL(
      req.url || '/',
      'http://localhost'
    ).pathname;

    // Public health endpoint.
    // This works without requiring a MongoDB connection.
    if (pathname === '/api/health') {
      return res.status(200).json({
        ok: true,
        application: 'Zodiac DatN',
        platform: 'Vercel',
        timestamp: new Date().toISOString()
      });
    }

    // Connect to MongoDB before executing API routes.
    await connectDb();

    // Forward the request to the Express application.
    return app(req, res);

  } catch (error) {
    console.error('Zodiac DatN API error:', error);

    if (!res.headersSent) {
      return res.status(503).json({
        error: 'Service temporarily unavailable',
        message: 'The API could not process your request.'
      });
    }
  }
}
