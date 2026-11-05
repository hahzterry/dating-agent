
import app from "../server/src/app.js";
import { connectDb } from "../server/src/lib/connectDb.js";

export default async function handler(req, res) {
  try {
    if (req.url === "/api/health") {
      return res.status(200).json({
        ok: true,
        application: "Zodiac DatN",
        runtime: "vercel"
      });
    }

    await connectDb();
    return app(req, res);
  } catch (error) {
    console.error("API error:", error);

    if (!res.headersSent) {
      return res.status(503).json({
        error: "Service temporarily unavailable"
      });
    }
  }
}

