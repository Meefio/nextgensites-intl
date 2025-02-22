import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nextgensites.pl'

  // Podstawowe strony dla każdego języka
  const localizedPages = routing.locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale === 'pl' ? '' : locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/${locale}/${locale === 'pl' ? 'polityka-prywatnosci' : 'privacy-policy'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/${locale}/${locale === 'pl' ? 'regulamin' : 'terms-of-service'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/${locale}/${locale === 'pl' ? 'rodo' : 'gdpr'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2
    },
    {
      url: `${baseUrl}/${locale}/underpressure`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }
  ])

  return [...localizedPages]
} 
