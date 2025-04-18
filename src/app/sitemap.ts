import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nextgensites.pl'

  // More precise dates for different content types
  const homeLastMod = new Date()
  const legalLastMod = new Date('2023-12-15') // Example date for legal pages
  const portfolioLastMod = new Date('2024-04-10') // Example date for portfolio updates

  // Main pages for Polish language (default, without language prefix)
  const plPages = [
    {
      url: `${baseUrl}/`,
      lastModified: homeLastMod,
      changeFrequency: 'weekly' as const,
      priority: 1
    },
    // Legal pages
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: legalLastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: legalLastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/rodo`,
      lastModified: legalLastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    // Portfolio pages - higher priority for marketing impact
    {
      url: `${baseUrl}/strona-internetowa-dla-firmy-sprzatajacej`,
      lastModified: portfolioLastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/strona-internetowa-dla-firmy-budowlano-remontowej`,
      lastModified: portfolioLastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }
  ]

  // Pages for other languages (with language prefix)
  const otherLocalesPages = routing.locales
    .filter(locale => locale !== 'pl')
    .flatMap(locale => [
      // Main page for each language
      {
        url: `${baseUrl}/${locale}`,
        lastModified: homeLastMod,
        changeFrequency: 'weekly' as const,
        priority: 1
      },
      // Legal pages for each language
      {
        url: `${baseUrl}/${locale}/privacy-policy`,
        lastModified: legalLastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.2
      },
      {
        url: `${baseUrl}/${locale}/terms-of-service`,
        lastModified: legalLastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.2
      },
      {
        url: `${baseUrl}/${locale}/gdpr`,
        lastModified: legalLastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.2
      },
      // Portfolio pages for each language
      {
        url: `${baseUrl}/${locale}/cleaning-company-website`,
        lastModified: portfolioLastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.8
      },
      {
        url: `${baseUrl}/${locale}/construction-and-renovation-company-website`,
        lastModified: portfolioLastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.8
      }
    ])

  return [...plPages, ...otherLocalesPages]
} 
