/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable persistent webpack disk caching in development 
      // to resolve monorepo hot-reloading desync and white-screen crashes.
      config.cache = false;
    }
    return config;
  },
  async rewrites() {
    let apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    if (apiEndpoint && !apiEndpoint.startsWith('http://') && !apiEndpoint.startsWith('https://') && !apiEndpoint.startsWith('/')) {
      apiEndpoint = `https://${apiEndpoint}`;
    }
    return [
      {
        source: '/api/trpc/:path*',
        destination: `${apiEndpoint}/trpc/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://*.supabase.co; connect-src 'self' https: wss: http://localhost:5000 ws://localhost:5000; frame-ancestors 'none'; require-trusted-types-for 'script';",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
