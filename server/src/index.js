
import { createServer } from 'node:http';
import mongoose from 'mongoose';

import app from './app.js';
import { env } from './config/env.js';

import {
  startKeepalive,
  stopKeepalive
} from './keepalive.js';

import './services/jobs/handlers.js';

import {
  startPeriodic,
  stopPeriodic
} from './services/jobs/periodic.js';

import {
  startWorker,
  stopWorker
} from './services/jobs/queue.js';

import { refresh as loadBudget } from './services/llm/budget.js';
import { activateWaiting } from './services/profileStatus.js';

import { registerSockets } from './sockets/index.js';
import { io } from './sockets/io.js';

const server = createServer(app);

io.attach(server);
registerSockets(io);

async function connectMongo(attempt = 1) {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('✓ MongoDB connected');

    await loadBudget({ force: true }).catch(err => {
      console.error(
        `budget load failed: ${err.message}`
      );
    });

    await activateWaiting()
      .then(n => {
        if (n) {
          console.log(
            `✓ ${n} waiting profiles activated`
          );
        }
      })
      .catch(err => {
        console.error(
          `activating profiles failed: ${err.message}`
        );
      });

    if (env.JOB_WORKER) {
      startWorker();
      startPeriodic();
    }
  } catch (err) {
    const delay = Math.min(
      30000,
      2000 * attempt
    );

    console.error(
      `MongoDB connection failed: ${err.message}`
    );

    setTimeout(
      () => connectMongo(attempt + 1),
      delay
    );
  }
}

server.listen(env.PORT, () => {
  console.log(
    `✓ Zodiac DatN server listening on ${env.PORT}`
  );
});

startKeepalive();
connectMongo();

process.on('SIGTERM', () => {
  console.log('SIGTERM received');

  io.close();
  stopPeriodic();
  stopKeepalive();

  server.close(async () => {
    await stopWorker();
    await mongoose.disconnect();
    process.exit(0);
  });
});
