import { getTranslations } from 'next-intl/server';
import { MetadataRoute } from 'next';

export default async function manifest({ params }: { params: { locale: string } }): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Manifest' });

  return {
    name: t('name'),
    short_name: t('shortName'),
    description: t('description'),
    id: '/',
    lang: params.locale,
    dir: 'ltr',
    start_url: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay'],
    background_color: '#020817',
    theme_color: '#020817',
    prefer_related_applications: false,
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
    categories: t('categories').split(',').map(c => c.trim()),
    screenshots: [
      {
        src: '/images/home.png',
        sizes: '1920x1080',
        type: 'image/png',
        label: t('screenshots.home.label')
      },
    ],
    related_applications: [],
    shortcuts: [
      {
        name: t('shortcuts.home.name'),
        short_name: t('shortcuts.home.shortName'),
        description: t('shortcuts.home.description'),
        url: "/",
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      }
    ]
  }
}
