import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pl', 'en'],

  // Used when no locale matches
  defaultLocale: 'pl',

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
    // Adding routes for new blog posts
    '/baza-wiedzy/jak-seo-wplywa-na-sukces-twojej-strony-internetowej': {
      pl: '/baza-wiedzy/jak-seo-wplywa-na-sukces-twojej-strony-internetowej',
      en: '/knowledge-base/how-seo-affects-your-websites-success'
    },
    '/baza-wiedzy/jak-stworzyc-efektywna-strone-internetowa-dla-malej-firmy': {
      pl: '/baza-wiedzy/jak-stworzyc-efektywna-strone-internetowa-dla-malej-firmy',
      en: '/knowledge-base/how-to-create-an-effective-website-for-small-businesses'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
