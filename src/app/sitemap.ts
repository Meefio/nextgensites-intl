import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getAllPosts } from '@/utils/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nextgensites.pl'

  // More precise dates for different content types
  const homeLastMod = new Date()
  const legalLastMod = new Date('2023-12-15')
  const portfolioLastMod = new Date('2024-04-10')

  // Generate static pages for Polish language (default, without language prefix)
  const plStaticPages = [
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
    },
    // Knowledge base main page
    {
      url: `${baseUrl}/baza-wiedzy`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }
  ]

  // Blog posts for Polish language - Always place under /baza-wiedzy/
  const plBlogPosts = getAllPosts('pl').map(post => ({
    url: `${baseUrl}/baza-wiedzy/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }))

  // Generate static pages for other languages (with language prefix)
  const otherLocalesStaticPages = routing.locales
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
      },
      // Knowledge base main page for each language
      {
        url: `${baseUrl}/${locale}/knowledge-base`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7
      }
    ])

  // Blog posts for other languages - Always place under /knowledge-base/
  const otherLocalesBlogPosts = routing.locales
    .filter(locale => locale !== 'pl')
    .flatMap(locale =>
      getAllPosts(locale).map(post => ({
        url: `${baseUrl}/${locale}/knowledge-base/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6
      }))
    )

  // Combine all sitemap entries
  return [
    ...plStaticPages,
    ...plBlogPosts,
    ...otherLocalesStaticPages,
    ...otherLocalesBlogPosts
  ]
} 
