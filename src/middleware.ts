import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import {
   redirectMap,
   shouldBypassMiddleware,
   CACHE_HEADERS,
   REDIRECT_CACHE_TTL,
   LOCALE_COOKIE_MAX_AGE
} from './middleware.config';

// Create the next-intl middleware with performance optimizations
const intlMiddleware = createMiddleware({
   // Spread the routing config
   ...routing,
   // Default locale shouldn't have a prefix
   localePrefix: 'as-needed',
   // Enable locale detection
   localeDetection: true
});

// Handle redirects efficiently using a map lookup instead of conditional logic
function handleRedirects(request: NextRequest) {
   const { pathname } = request.nextUrl;

   // Redirect /pl/* to /* since Polish is the default locale and shouldn't have a prefix
   if (pathname.startsWith('/pl/') || pathname === '/pl') {
      const newPath = pathname.replace(/^\/pl\/?/, '/');
      const response = NextResponse.redirect(new URL(newPath, request.url));
      response.headers.set('Cache-Control', `public, max-age=${REDIRECT_CACHE_TTL}`);
      return response;
   }

   // Use direct map lookup instead of multiple conditionals
   if (redirectMap[pathname]) {
      const response = NextResponse.redirect(new URL(redirectMap[pathname], request.url));

      // Add cache headers to redirects to improve performance
      response.headers.set('Cache-Control', `public, max-age=${REDIRECT_CACHE_TTL}`);
      return response;
   }

   return null;
}

// Export the combined middleware with performance optimizations
export default function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   // Bypass middleware for static assets and API routes
   if (shouldBypassMiddleware(pathname)) {
      return NextResponse.next();
   }

   // First check if we need to redirect
   const redirectResponse = handleRedirects(request);
   if (redirectResponse) return redirectResponse;

   // Get response from next-intl middleware
   const response = intlMiddleware(request);

   // Set cookie with longer expiration if we detect a locale
   if (request.cookies.has('NEXT_LOCALE')) {
      const locale = request.cookies.get('NEXT_LOCALE')?.value;
      if (locale) {
         response.cookies.set('NEXT_LOCALE', locale, {
            maxAge: LOCALE_COOKIE_MAX_AGE,
            path: '/'
         });
      }
   }

   // Set immutable cache headers for static assets
   if (pathname.startsWith('/_next/static/') ||
      /\.(jpg|jpeg|png|gif|ico|svg|css|js)$/.test(pathname)) {
      // Apply cache headers for all static assets
      Object.entries(CACHE_HEADERS).forEach(([key, value]) => {
         response.headers.set(key, value);
      });
   }

   return response;
}

export const config = {
   matcher: [
      // Match all paths except those that don't require internationalization
      '/((?!api|_next|_vercel|.*\\..*).*)',
   ]
};
