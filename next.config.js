/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  
  // Completely disable TypeScript and ESLint checking during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable all static optimizations to prevent prerendering errors
  trailingSlash: false,
  generateEtags: false,
  
  // Force all pages to be server-side rendered
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add fallbacks for Node.js modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
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
      }
    }
    
    // Ignore Prisma warnings
    config.ignoreWarnings = [
      { module: /node_modules\/@prisma\/client/ },
      { file: /node_modules\/@prisma\/client/ },
    ]
    
    return config
  },
  
  // Minimal image configuration
  images: {
    unoptimized: true,
  },
  
  // Simple headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig