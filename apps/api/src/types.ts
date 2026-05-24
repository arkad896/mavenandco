/**
 * Type-only re-exports for the frontend web application.
 * This file must NEVER import any runtime modules (express, prisma, better-sqlite3)
 * because it is consumed by the Next.js bundler which cannot handle native addons.
 */
export type { AppRouter } from './router.js';
