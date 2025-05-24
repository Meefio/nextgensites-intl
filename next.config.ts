import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

// Add bundle analyzer
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

// Base experimental configuration
const baseExperimental = {
  optimizeCss: true,
  scrollRestoration: true,
  optimizePackageImports: [
    'next-intl',
    'lucide-react',
    'framer-motion',
    '@radix-ui/react-accordion',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-label',
    '@radix-ui/react-slot',
    '@radix-ui/react-switch',
    '@radix-ui/react-toast'
  ],
  webVitalsAttribution: ['LCP', 'CLS'] as ('LCP' | 'CLS' | 'FCP' | 'FID' | 'INP' | 'TTFB')[],
  staticGenerationRetryCount: 1,
  staticGenerationMaxConcurrency: 8,
  staticGenerationMinPagesPerWorker: 25,
  staleTimes: {
    dynamic: 30, // 30 seconds for dynamic content
    static: 180, // 3 minutes for static content
  },
};

// Development-specific experimental configuration
const developmentExperimental = {
  ...baseExperimental,
  turbo: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

const nextConfig: NextConfig = {
  // Set environment variables
  env: {
    NEXT_PUBLIC_ENV: process.env.NODE_ENV
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Disable logging completely to prevent console spam
  // Disable development logging completely to reduce noise
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    qualities: [50, 75, 80, 90, 95],
  },
  experimental: process.env.NODE_ENV === 'development'
    ? developmentExperimental
    : baseExperimental,
  // Increase timeout for static page generation
  staticPageGenerationTimeout: 300,
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configure caching headers
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },

      // Different CSP for development and production
      process.env.NODE_ENV === 'production'
        ? {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            // Allow scripts from Google Analytics/Tag Manager with nonces/hashes allowed inline scripts
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.vercel-scripts.com https://va.vercel-scripts.com https://*.googlesyndication.com",
            // Allow styles from self and inline for dynamic styling
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Allow images from self, data URIs, Google services, and CDNs
            "img-src 'self' blob: data: https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://cdn.jsdelivr.net https://*.googlesyndication.com",
            // Allow fonts from self, Google Fonts, and data URIs
            "font-src 'self' https://fonts.gstatic.com data:",
            // Allow connections to self and analytics endpoints
            "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://region1.google-analytics.com https://*.analytics.google.com https://*.vercel-scripts.com https://va.vercel-scripts.com https://*.googlesyndication.com",
            // Allow frames from self and Google services (critical for some GA features)
            "frame-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://*.googlesyndication.com",
            // Disallow objects which can be security risks
            "object-src 'none'",
            // Define base URIs for relative URLs
            "base-uri 'self'",
            // Form submissions only to self URLs
            "form-action 'self'",
            // Media sources from self only
            "media-src 'self'",
            // Upgrade insecure requests
            "upgrade-insecure-requests"
          ].join('; '),
        }
        : { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-scripts.com https://va.vercel-scripts.com https://*.googlesyndication.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://cdn.jsdelivr.net https://*.googlesyndication.com; font-src 'self' data:; connect-src 'self' https://*.vercel-scripts.com https://va.vercel-scripts.com https://*.googlesyndication.com; media-src 'self'; frame-src 'self' https://*.googlesyndication.com;", },
    ];

    return [
      {
        // Add CORS headers for OPTIONS requests to fix the preflight issue
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development'
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development'
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|gif|png|svg|ico|webp|avif)',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development'
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.(js|css)',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development'
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Add caching headers for knowledge base articles
      {
        source: '/(baza-wiedzy|knowledge-base)/:slug*',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development'
              ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
              : 'public, max-age=300, s-maxage=600, stale-while-revalidate=1200',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Handle Node.js built-in modules for client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        events: false,
      };
    }

    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 8,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      }
    }
    return config
  },
};

// Apply all plugins
export default withBundleAnalyzer(withNextIntl(nextConfig));
