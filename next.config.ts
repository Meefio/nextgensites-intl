import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextgensites.pl',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
};

export default withNextIntl(nextConfig);
