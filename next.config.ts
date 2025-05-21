import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

// Add bundle analyzer
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config;

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
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: process.env.NODE_ENV === 'development' ? 0 : 86400, // 0 for dev, 24 hours for prod
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextgensites.pl',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-label',
      '@radix-ui/react-switch',
      '@radix-ui/react-toast',
    ],
    // Track only the most important metrics to reduce overhead
    // LCP is the most important metric for user experience
    // CLS is important for layout stability
    webVitalsAttribution: ['LCP', 'CLS'],
  },
  // Increase timeout for static page generation
  staticPageGenerationTimeout: 300,
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
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
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.vercel-scripts.com https://va.vercel-scripts.com",
            // Allow styles from self and inline for dynamic styling
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Allow images from self, data URIs, Google services, and CDNs
            "img-src 'self' blob: data: https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net https://cdn.jsdelivr.net",
            // Allow fonts from self, Google Fonts, and data URIs
            "font-src 'self' https://fonts.gstatic.com data:",
            // Allow connections to self and analytics endpoints
            "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://region1.google-analytics.com https://*.analytics.google.com https://*.vercel-scripts.com https://va.vercel-scripts.com",
            // Allow frames from self and Google services (critical for some GA features)
            "frame-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.g.doubleclick.net",
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
        : {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-scripts.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://cdn.jsdelivr.net; font-src 'self' data:; connect-src 'self' https://*.vercel-scripts.com https://va.vercel-scripts.com; media-src 'self'; frame-src 'self';",
        },
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
    ];
  },
};

// Apply all plugins
export default withBundleAnalyzer(withNextIntl(nextConfig));
