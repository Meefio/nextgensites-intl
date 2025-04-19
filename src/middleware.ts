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
   ...routing,
   // Default locale shouldn't have a prefix
   localePrefix: 'as-needed',
   // Enable locale detection (but configure the cookie in a different way)
   localeDetection: true,
   // Use cookie configuration options directly
   cookieName: 'NEXT_LOCALE',
   cookieMaxAge: LOCALE_COOKIE_MAX_AGE
});

// Handle redirects efficiently using a map lookup instead of conditional logic
function handleRedirects(request: NextRequest) {
   const { pathname } = request.nextUrl;

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

   // Add cache headers to static resources
   const response = intlMiddleware(request);

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
