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
   // Enable locale detections
   localeDetection: true
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

// Cache time for article pages in seconds (5 minutes)
const ARTICLE_CACHE_TTL = 300;

// Export the combined middleware with performance optimizations
export default function middleware(request: NextRequest) {
   const { pathname, search } = request.nextUrl;
   const { method } = request;

   // Explicitly bypass middleware for RSC requests
   if (search && search.includes('_rsc=')) {
      return NextResponse.next();
   }

   // Get current locale from cookie if exists
   const currentLocale = request.cookies.get('NEXT_LOCALE')?.value;

   // Handle OPTIONS requests for CORS preflight
   if (method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 204 });

      // Add CORS headers
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours

      return response;
   }

   // Bypass middleware for static assets and API routes
   if (shouldBypassMiddleware(pathname) || shouldBypassMiddleware(pathname + search)) {
      return NextResponse.next();
   }

   // First check if we need to redirect
   const redirectResponse = handleRedirects(request);
   if (redirectResponse) return redirectResponse;

   // Enhanced handling for explicit Polish language selection
   if (pathname === '/pl' || pathname.startsWith('/pl/')) {
      // User explicitly navigates to a Polish URL
      const targetPath = pathname === '/pl' ? '/' : pathname.replace(/^\/pl/, '');
      const response = NextResponse.redirect(new URL(targetPath, request.url));

      // Force clear ALL locale-related cookies to ensure a clean state
      response.cookies.delete('NEXT_LOCALE');
      response.cookies.delete('next-locale');
      response.cookies.delete('i18next');

      // Set Polish locale explicitly with SameSite and Secure attributes
      response.cookies.set('NEXT_LOCALE', 'pl', {
         maxAge: LOCALE_COOKIE_MAX_AGE,
         path: '/',
         sameSite: 'lax',
         secure: process.env.NODE_ENV === 'production',
         httpOnly: false // Allow client-side access
      });

      // Use shorter cache or no-cache for language switch redirects
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');

      return response;
   }

   // Force root path to use Polish for users with English cookie who are explicitly trying to access the root
   if (pathname === '/' && currentLocale === 'en') {
      // User is trying to access root path but has English cookie
      // We need to handle this as an explicit preference for Polish
      const response = NextResponse.next();

      // Clear locale cookies
      response.cookies.delete('NEXT_LOCALE');
      response.cookies.delete('next-locale');
      response.cookies.delete('i18next');

      // Set Polish locale explicitly
      response.cookies.set('NEXT_LOCALE', 'pl', {
         maxAge: LOCALE_COOKIE_MAX_AGE,
         path: '/',
         sameSite: 'lax',
         secure: process.env.NODE_ENV === 'production',
         httpOnly: false
      });

      // Prevent caching
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');

      return response;
   }

   // Get response from next-intl middleware
   const response = intlMiddleware(request);

   // Set cookie with longer expiration if we detect a locale
   if (request.cookies.has('NEXT_LOCALE')) {
      const locale = request.cookies.get('NEXT_LOCALE')?.value;
      if (locale) {
         response.cookies.set('NEXT_LOCALE', locale, {
            maxAge: LOCALE_COOKIE_MAX_AGE,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: false // Allow client-side access
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

   // Add caching for article pages in knowledge base
   if (pathname.includes('/baza-wiedzy/') || pathname.includes('/knowledge-base/')) {
      // Only add cache for GET requests
      if (method === 'GET') {
         response.headers.set('Cache-Control', `public, max-age=${ARTICLE_CACHE_TTL}, s-maxage=${ARTICLE_CACHE_TTL * 2}, stale-while-revalidate=${ARTICLE_CACHE_TTL * 4}`);
      }
   }

   return response;
}

export const config = {
   matcher: [
      // Match all paths except those that don't require internationalization
      '/((?!api|_next|_vercel|studio|.*\\..*).*)',
   ]
};
