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
    
    // Ignore Prisma warnings
    config.externals = config.externals || [];
    config.externals.push('@prisma/client');
    
    return config;
  },
};

module.exports = nextConfig;