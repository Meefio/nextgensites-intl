import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@/messages'] = path.resolve(__dirname, 'src/messages');
    return config;
  },
};

export default withNextIntl(nextConfig);
