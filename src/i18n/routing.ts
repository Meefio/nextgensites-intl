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
    '/#benefits': {
      pl: '/#korzysci',
      en: '/#benefits'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
