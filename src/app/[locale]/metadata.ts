import { Metadata } from 'next';

export const metadata = (locale: string): Metadata => ({
  metadataBase: new URL('https://nextgensites.pl'),
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/pl',
    languages: {
      'pl-PL': '/pl',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NextGen Sites',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nextgensites',
    creator: '@nextgensites',
    images: '/images/og-image.png',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#020817',
      },
    ],
  },
  manifest: `/${locale}/manifest.json`,
  category: 'technology',
  other: {
    'color-scheme': 'dark',
    'theme-color': '#020817',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msvalidate.01': '4DF508BDA9824D31C606EEF153D9F5C2',
  },
}); 
