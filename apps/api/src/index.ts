import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './context.js';
import { appRouter } from './router.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client
app.use(
  cors({
    origin: ['http://localhost:3000'],
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

// Simple fallback endpoint
app.get('/', (req, res) => {
  res.send('tRPC REST API Backend server running at /trpc');
});

app.listen(PORT, () => {
  console.log(`🚀 tRPC Server listening on http://localhost:${PORT}`);
});
export type { AppRouter } from './router.js';
