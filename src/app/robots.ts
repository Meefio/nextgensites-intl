import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/_vercel/',
          '/private/',
          '/*.json$',
          '/error',
        ],
        crawlDelay: 2,
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/private-content/'],
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/images/',
      }
    ],
    sitemap: 'https://nextgensites.pl/sitemap.xml',
    host: 'https://nextgensites.pl',
  }
} 
