import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
   ...routing,
   // Domyślny locale nie powinien mieć prefiksu
   localePrefix: 'as-needed'
});

export const config = {
   matcher: [
      // Dopasuj wszystkie ścieżki oprócz tych, które nie wymagają internacjonalizacji
      '/((?!api|_next|_vercel|.*\\..*).*)',
   ]
};
