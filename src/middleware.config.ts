/**
 * Configuration for Next.js middleware performance optimization
 * 
 * This file contains configurations to optimize the middleware execution time
 * which is critical for server response performance.
 */

// Define all URL patterns that require redirection
// This helps us avoid checking complex conditions for every request
export const redirectPatterns = [
  '/underpressure',
  '/en/underpressure',
  '/buildwise',
  '/en/buildwise',
  // Add blog redirections for old URLs or typos
  '/en/how-to-choose-a-website-for-your-business-typo',
  '/jak-wybrac-dobra-strone-internetowa-dla-swojej-firmy', // Handle old slug
  '/en/how-to-choose-the-right-website-for-your-business', // Handle old English slug
];

// Map of old paths to their new paths for faster lookups
export const redirectMap: Record<string, string> = {
  '/underpressure': '/strona-internetowa-dla-firmy-sprzatajacej',
  '/en/underpressure': '/en/cleaning-company-website',
  '/buildwise': '/strona-internetowa-dla-firmy-budowlano-remontowej',
  '/en/buildwise': '/en/construction-and-renovation-company-website',
  // Blog post redirects
  '/jak-wybrac-dobra-strone-internetowa-dla-swojej-firmy': '/jak-wybrac-strone-internetowa-dla-swojej-firmy',
  '/en/how-to-choose-the-right-website-for-your-business': '/en/how-to-choose-a-website-for-your-business',
  '/en/how-to-choose-a-website-for-your-business-typo': '/en/how-to-choose-a-website-for-your-business',
};

// Cache TTL for redirects in seconds (1 hour)
export const REDIRECT_CACHE_TTL = 3600;

// Configuration for response headers to improve caching
export const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=31536000, immutable',
};

// Patterns that should bypass the middleware completely for better performance
export const bypassPatterns = [
  /^\/_next\//,  // Next.js assets
  /^\/images\//,  // Static images
  /^\/api\//,  // API routes
  /^\/studio\//,  // Sanity Studio
  /^\/favicon\.ico$/,  // Favicon
  /^\/robots\.txt$/,  // Robots.txt
  /^\/sitemap\.xml$/,  // Sitemap
  /\.(jpe?g|png|gif|ico|css|js|svg)$/,  // Static assets
  /\?_rsc=.*$/,  // React Server Component requests - exclude from middleware processing
  /\/_not-found$/,  // 404 page
  /\/images\/_next/,  // Image optimization
];

// Check if a path matches any bypass patterns
export function shouldBypassMiddleware(path: string): boolean {
  return bypassPatterns.some(pattern => {
    if (typeof pattern === 'string') {
      return pattern === path;
    }
    return pattern.test(path);
  });
}

// Max age for locale cookie in seconds (7 days)
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; 
