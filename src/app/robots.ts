import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/_vercel/',
      ],
    },
    sitemap: 'https://nextgensites.pl/sitemap.xml',
    host: 'https://nextgensites.pl/pl',
  }
} 
