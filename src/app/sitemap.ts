import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nextgensites.pl'
  const currentDate = new Date()

  // Strony dla języka polskiego (bez prefiksu językowego)
  const plPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/rodo`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/underpressure`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }
  ]

  // Strony dla innych języków (z prefiksem językowym)
  const otherLocalesPages = routing.locales
    .filter(locale => locale !== 'pl')
    .flatMap(locale => [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 1
      },
      {
        url: `${baseUrl}/${locale}/privacy-policy`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.2
      },
      {
        url: `${baseUrl}/${locale}/terms-of-service`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.2
      },
      {
        url: `${baseUrl}/${locale}/gdpr`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.2
      },
      {
        url: `${baseUrl}/${locale}/underpressure`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8
      }
    ])

  return [...plPages, ...otherLocalesPages]
} 
