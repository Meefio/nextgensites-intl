import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/sanity/queries'
import { DOMAIN, KNOWLEDGE_BASE_PATHS } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages configuration
  const staticPages = [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${DOMAIN}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${DOMAIN}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/en/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/en/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/rodo`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/en/gdpr`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/strona-internetowa-dla-firmy-sprzatajacej`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/en/cleaning-company-website`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/strona-internetowa-dla-firmy-budowlano-remontowej`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/en/construction-and-renovation-company-website`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Knowledge base index pages
    {
      url: `${DOMAIN}${KNOWLEDGE_BASE_PATHS.PL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/en${KNOWLEDGE_BASE_PATHS.EN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Get all blog post slugs from Sanity
  const slugs = await getAllSlugs();

  // Create blog post entries
  const blogEntries: MetadataRoute.Sitemap = [];

  // Process each slug
  for (const post of slugs) {
    // Add Polish entry if available
    if (post.pl) {
      blogEntries.push({
        url: `${DOMAIN}${KNOWLEDGE_BASE_PATHS.PL}/${post.pl}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    }

    // Add English entry if available
    if (post.en) {
      blogEntries.push({
        url: `${DOMAIN}/en${KNOWLEDGE_BASE_PATHS.EN}/${post.en}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      });
    }
  }

  return [
    ...staticPages,
    ...blogEntries
  ]
} 
