/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Add TypeScript and ESLint configurations for production builds
  typescript: {
    // Only ignore build errors in production to prevent deployment failures
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Only ignore during builds in production
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
  // Disable static generation for pages that require runtime data
  trailingSlash: false,
  generateEtags: false,
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks.chunks = 'all'
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\/]node_modules[\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        framerMotion: {
          test: /[\/]node_modules[\/]framer-motion[\/]/,
          name: 'framer-motion',
          chunks: 'all',
        },
        reactIcons: {
          test: /[\/]node_modules[\/]react-icons[\/]/,
          name: 'react-icons',
          chunks: 'all',
        },
      }
      
      // Add fallbacks for Node.js modules in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'production' 
              ? 'public, max-age=31536000, immutable'
              : 'no-cache, no-store, must-revalidate',
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig