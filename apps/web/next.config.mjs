/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do NOT transpile @maven/api — it contains native Node.js addons
  // (better-sqlite3, prisma) that cannot run in Vercel's serverless runtime.
  // The web app only needs the AppRouter *type* from the API package.
  serverExternalPackages: [
    'better-sqlite3',
    '@prisma/adapter-better-sqlite3',
    '@prisma/client',
  ],
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable persistent webpack disk caching in development 
      // to resolve monorepo hot-reloading desync and white-screen crashes.
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;
