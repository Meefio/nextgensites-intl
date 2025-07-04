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
    // Knowledge base - now using dynamic routes
    '/baza-wiedzy': {
      pl: '/baza-wiedzy',
      en: '/knowledge-base'
    },
    // Dynamic route pattern for blog articles
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
    // Add route for new article about modern websites
    '/nowoczesna-strona-internetowa-co-to-wlasciwie-znaczy': {
      pl: '/nowoczesna-strona-internetowa-co-to-wlasciwie-znaczy',
      en: '/modern-website-what-does-it-actually-mean'
    },
    // Add route for web application article
    '/aplikacja-webowa-nowoczesne-rozwiazanie-dla-biznesu': {
      pl: '/aplikacja-webowa-nowoczesne-rozwiazanie-dla-biznesu',
      en: '/web-application-modern-solution-for-business'
    },
    // Keep existing example post
    '/przyklad-wpisu-wykorzystujacego-wszystkie-komponenty': {
      pl: '/przyklad-wpisu-wykorzystujacego-wszystkie-komponenty',
      en: '/example-post-using-all-components'
    },
    // Add Framer templates page
    '/szablony-framer': {
      pl: '/szablony-framer',
      en: '/framer-templates'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
