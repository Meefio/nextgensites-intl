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
    '/underpressure': {
      pl: '/underpressure',
      en: '/underpressure'
    }
  }
});
  
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
