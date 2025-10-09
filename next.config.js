/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force standalone output for deployment
  output: 'standalone',
  
  // Disable all optimizations that could cause issues
  swcMinify: false,
  
  // Ignore all build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable static generation completely
  trailingSlash: false,
  generateEtags: false,
  
  // Basic image configuration
  images: {
    unoptimized: true,
  },
  
  // Webpack configuration for Node.js compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure Prisma Client is not bundled on the client side
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // Properly externalize @prisma/client for server-side only
    if (isServer) {
      config.externals = [...(config.externals || []), '@prisma/client'];
    }
    
    return config;
  },
  
  // Experimental features to improve Prisma compatibility
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

module.exports = nextConfig;