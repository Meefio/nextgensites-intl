import { Metadata } from 'next';
import { createCanonicalUrl } from '@/app/utils/createCanonicalUrl';

export const metadata = (locale: string): Metadata => ({
  metadataBase: new URL('https://nextgensites.pl'),
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: locale === 'pl' ? 'pl' : 'en',
    siteName: 'NextGen Sites',
    images: [
      {
        url: 'https://nextgensites.pl/images/og-image.png',
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
    images: [{
      url: 'https://nextgensites.pl/images/og-image.png',
      alt: 'NextGen Sites',
    }],
  },
  category: 'technology',
  verification: {
    google: '4DF508BDA9824D31C606EEF153D9F5C2',
    yandex: 'yandex-verification-code',
    other: {
      me: ['kontakt@nextgensites.pl'],
      'msvalidate.01': '4DF508BDA9824D31C606EEF153D9F5C2',
    }
  },
  other: {
    'color-scheme': 'dark',
    'theme-color': '#020817',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
  archives: ['https://nextgensites.pl/blog/archives'],
  keywords: ['strony internetowe', 'next.js', 'web development', 'aplikacje webowe', 'SEO'],
  authors: [
    { name: 'Michał Rowiński', url: 'https://nextgensites.pl' }
  ],
}); 
