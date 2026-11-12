
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { clientIp } from './middleware/clientIp.js';
import { allowOrigin } from './config/env.js';
import { keepaliveStatus } from './keepalive.js';
import { requireAuth } from './middleware/auth.js';
import { errorHandler, notFound } from './middleware/error.js';

import { adminRouter } from './routes/admin.js';
import { authRouter } from './routes/auth.js';
import { discoverRouter } from './routes/discover.js';
import { inboxRouter } from './routes/inbox.js';
import { kgRouter } from './routes/kg.js';
import { matchesRouter } from './routes/matches.js';
import { meRouter } from './routes/me.js';
import { onboardingRouter } from './routes/onboarding.js';
import { photosRouter } from './routes/photos.js';
import { profileRouter } from './routes/profile.js';

import { cloudinaryOn, UPLOAD_DIR } from './services/photos.js';
import { CITY_NAMES } from './services/cities.js';

const app = express();

app.set('trust proxy', 1);

app.use(clientIp);

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin'
    }
  })
);

app.use('/health', cors());
app.use(cors({ origin: allowOrigin }));
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    application: 'Zodiac DatN',
    uptime: process.uptime(),
    time: new Date().toISOString(),
    viaSite: req.viaVercel,
    siteHeader: req.hasOriginHeader
  });
});

// MongoDB health
app.get('/health/deep', (req, res) => {
  const states = [
    'disconnected',
    'connected',
    'connecting',
    'disconnecting'
  ];

  const state = mongoose.connection.readyState;

  res.status(state === 1 ? 200 : 503).json({
    ok: state === 1,
    mongo: states[state] ?? 'unknown'
  });
});

// Keepalive status
app.get('/health/keepalive-status', (req, res) => {
  res.json(keepaliveStatus());
});

// Local photo storage
if (!cloudinaryOn()) {
  app.use(
    '/uploads',
    express.static(fileURLToPath(UPLOAD_DIR), {
      maxAge: '7d'
    })
  );
}

// Public API
app.get('/api/cities', (req, res) => {
  res
    .set('Cache-Control', 'public, max-age=86400')
    .json({ cities: CITY_NAMES });
});

// Authentication
app.use('/api/auth', authRouter);

// Admin
app.use('/api/admin', adminRouter);

// Protected routes
app.use(
  '/api',
  requireAuth,
  meRouter,
  profileRouter,
  onboardingRouter,
  kgRouter,
  discoverRouter,
  matchesRouter,
  inboxRouter,
  photosRouter
);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
