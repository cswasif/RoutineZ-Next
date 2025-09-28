/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // compiler options temporarily disabled for Turbopack compatibility
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Cloudflare specific configuration - Use static export for Pages
  output: 'export',
  // Disable webpack persistent caching to avoid large cache files
  webpack: (config, { isServer }) => {
    // Disable persistent caching
    config.cache = false;
    
    // For Cloudflare Pages, we need to ensure no large cache files are generated
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        // Reduce chunk size to avoid large files
        splitChunks: {
          ...config.optimization?.splitChunks,
          maxSize: 2000000, // 2MB max chunk size
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;