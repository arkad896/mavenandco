import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './context.js';
import { appRouter } from './router.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// Mount tRPC adapter middleware
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

import { eventEmitter } from './events.js';

// Simple fallback endpoint
app.get('/', (req, res) => {
  res.send('tRPC REST API Backend server running at /trpc');
});

// Native Server-Sent Events (SSE) Endpoint
app.get('/api/events', (req, res) => {
  console.log('📡 [SSE] Client connected to live stream');

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Keep-alive heartbeat
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'Core SSE Pipeline Established' })}\n\n`);

  const handleLiveEvent = (payload: any) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  // Listen to shared events
  eventEmitter.on('live-event', handleLiveEvent);

  // Unsubscribe when client disconnects
  req.on('close', () => {
    console.log('🔌 [SSE] Client disconnected from live stream');
    eventEmitter.off('live-event', handleLiveEvent);
  });
});

if (process.env.VERCEL) {
  console.log('🚀 Serverless function initialized.');
} else {
  app.listen(PORT, () => {
    console.log(`🚀 tRPC Server listening on http://localhost:${PORT}`);
  });
}

export default app;
export type { AppRouter } from './router.js';
