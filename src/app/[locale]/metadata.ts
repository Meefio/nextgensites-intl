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
    canonical: `https://nextgensites.pl${locale === 'pl' ? '' : `/${locale}`}`,
    languages: {
      'pl-PL': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: locale === 'pl' ? 'pl_PL' : 'en_US',
    url: locale === 'pl' ? 'https://nextgensites.pl' : 'https://nextgensites.pl/en',
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
  other: {
    'color-scheme': 'dark',
    'theme-color': '#020817',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msvalidate.01': '4DF508BDA9824D31C606EEF153D9F5C2',
  },
  authors: [
    { name: 'Michał Rowiński', url: 'https://nextgensites.pl' }
  ],
}); 
