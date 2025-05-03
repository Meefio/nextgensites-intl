import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pl', 'en'],

  // Used when no locale matches
  defaultLocale: 'pl',

  // Change from default 'always' to 'as-needed' so the default locale (pl) doesn't have a prefix
  localePrefix: 'as-needed',

  pathnames: {
    '/': '/',
    '/privacy-policy': {
      pl: '/polityka-prywatnosci',
      en: '/privacy-policy'
    },
    '/terms-of-service': {
      pl: '/regulamin',
      en: '/terms-of-service'
    },
    '/gdpr': {
      pl: '/rodo',
      en: '/gdpr'
    },
    '/strona-internetowa-dla-firmy-sprzatajacej': {
      pl: '/strona-internetowa-dla-firmy-sprzatajacej',
      en: '/cleaning-company-website'
    },
    '/strona-internetowa-dla-firmy-budowlano-remontowej': {
      pl: '/strona-internetowa-dla-firmy-budowlano-remontowej',
      en: '/construction-and-renovation-company-website'
    },
    '/baza-wiedzy': {
      pl: '/baza-wiedzy',
      en: '/knowledge-base'
    },
    '/baza-wiedzy/[slug]': {
      pl: '/baza-wiedzy/[slug]',
      en: '/knowledge-base/[slug]'
    },

    // Fix existing blog post route
    '/jak-wybrac-strone-internetowa-dla-swojej-firmy': {
      pl: '/jak-wybrac-strone-internetowa-dla-swojej-firmy',
      en: '/how-to-choose-a-website-for-your-business'
    },
    // Add new blog post route for Next.js article
    '/dlaczego-nextjs-to-przyszlosc-stron-internetowych-dla-biznesu': {
      pl: '/dlaczego-nextjs-to-przyszlosc-stron-internetowych-dla-biznesu',
      en: '/why-nextjs-is-the-future-of-business-websites'
    },
    // Keep existing example post
    '/przyklad-wpisu-wykorzystujacego-wszystkie-komponenty': {
      pl: '/przyklad-wpisu-wykorzystujacego-wszystkie-komponenty',
      en: '/example-post-using-all-components'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
