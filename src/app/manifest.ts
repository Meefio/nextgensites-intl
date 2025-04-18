import { MetadataRoute } from 'next'
import { createTranslator } from 'next-intl'

async function getTranslations(locale: string) {
  const messages = (await import(`@/../messages/${locale}.json`)).default
  const t = createTranslator({ locale, messages: messages.Manifest })
  return t
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations('pl')

  return {
    name: t('name'),
    short_name: t('shortName'),
    description: t('description'),
    start_url: '/',
    id: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay'],
    background_color: '#020817',
    theme_color: '#020817',
    lang: 'pl',
    dir: 'ltr',
    prefer_related_applications: false,
    categories: t('categories').split(',').map(c => c.trim()),
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    orientation: 'portrait',
    screenshots: [
      {
        src: '/images/home.png',
        sizes: '1920x1080',
        type: 'image/png',
        label: t('screenshots.home.label')
      },
      {
        src: '/images/portfolio.png',
        sizes: '1920x1080',
        type: 'image/png',
        label: t('screenshots.portfolio.label')
      },
      {
        src: '/images/pricing.png',
        sizes: '1920x1080',
        type: 'image/png',
        label: t('screenshots.pricing.label')
      },
      {
        src: '/images/contact.png',
        sizes: '1920x1080',
        type: 'image/png',
        label: t('screenshots.contact.label')
      }
    ],
    related_applications: [],
    shortcuts: [
      {
        name: t('shortcuts.home.name'),
        short_name: t('shortcuts.home.shortName'),
        description: t('shortcuts.home.description'),
        url: "/",
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      },
      {
        name: t('shortcuts.portfolio.name'),
        short_name: t('shortcuts.portfolio.shortName'),
        description: t('shortcuts.portfolio.description'),
        url: "/#portfolio",
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      },
      {
        name: t('shortcuts.contact.name'),
        short_name: t('shortcuts.contact.shortName'),
        description: t('shortcuts.contact.description'),
        url: "/#contact",
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      }
    ]
  }
} 
