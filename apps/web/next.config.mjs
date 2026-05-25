/** @type {import('next').NextConfig} */
const nextConfig = {
  // The web app only needs the AppRouter *type* from the API package.
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
    ],
  },
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
