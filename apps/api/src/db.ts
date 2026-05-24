import { PrismaClient } from './generated/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

let dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

// Workaround for SQLite on Vercel serverless environments
if (process.env.VERCEL) {
  const targetDbPath = '/tmp/dev.db';
  dbUrl = `file:${targetDbPath}`;

  try {
    if (!fs.existsSync(targetDbPath)) {
      console.log('📦 [Vercel DB Init] Copying seed dev.db to writable /tmp/dev.db...');
      const sourceDbPath = path.join(process.cwd(), 'dev.db');
      if (fs.existsSync(sourceDbPath)) {
        fs.copyFileSync(sourceDbPath, targetDbPath);
        console.log('✅ [Vercel DB Init] dev.db copied successfully.');
      } else {
        console.error(`❌ [Vercel DB Init] Source dev.db not found at ${sourceDbPath}`);
      }
    } else {
      console.log('ℹ️ [Vercel DB Init] dev.db already exists in /tmp.');
    }
  } catch (error) {
    console.error('❌ [Vercel DB Init] Failed to initialize SQLite in /tmp:', error);
  }
}

const adapter = new PrismaBetterSqlite3({
  url: dbUrl,
});

export const prisma = new PrismaClient({ adapter });


