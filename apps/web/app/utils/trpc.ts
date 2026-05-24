import { createTRPCReact } from '@trpc/react-query';
/**
 * Import the AppRouter type directly from the router source file
 * instead of from @maven/api's main entry point.
 * This avoids Next.js bundler pulling in native modules (better-sqlite3, prisma)
 * through the express/db import chain in index.ts.
 */
import type { AppRouter } from '@maven/api/src/router';

export const trpc = createTRPCReact<AppRouter>();
