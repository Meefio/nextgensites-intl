import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Custom middleware to handle redirects from old to new URLs
function handleRedirects(request: NextRequest) {
   const { pathname } = request.nextUrl;

   // Redirects for old project URLs
   if (pathname === '/underpressure' || pathname === '/en/underpressure') {
      const newPath = pathname.startsWith('/en')
         ? '/en/cleaning-company-website'
         : '/strona-internetowa-dla-firmy-sprzatajacej';

      return NextResponse.redirect(new URL(newPath, request.url));
   }

   if (pathname === '/buildwise' || pathname === '/en/buildwise') {
      const newPath = pathname.startsWith('/en')
         ? '/en/construction-and-renovation-company-website'
         : '/strona-internetowa-dla-firmy-budowlano-remontowej';

      return NextResponse.redirect(new URL(newPath, request.url));
   }

   return null;
}

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
   ...routing,
   // Domyślny locale nie powinien mieć prefiksu
   localePrefix: 'as-needed'
});

// Export the combined middleware
export default function middleware(request: NextRequest) {
   // First check if we need to redirect
   const redirectResponse = handleRedirects(request);
   if (redirectResponse) return redirectResponse;

   // Otherwise, handle internationalization
   return intlMiddleware(request);
}

export const config = {
   matcher: [
      // Dopasuj wszystkie ścieżki oprócz tych, które nie wymagają internacjonalizacji
      '/((?!api|_next|_vercel|.*\\..*).*)',
   ]
};
