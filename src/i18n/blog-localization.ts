/**
 * Utility for handling blog post localization between different languages
 */
import { client } from '@/lib/sanity/client';

// Section translations for paths like baza-wiedzy -> knowledge-base
export const sectionTranslations: Record<string, Record<string, string>> = {
  'baza-wiedzy': {
    en: 'knowledge-base'
  },
  'knowledge-base': {
    pl: 'baza-wiedzy'
  }
}

/**
 * Cache for slug mappings to avoid repeated API calls
 */
const slugMappingCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: Record<string, string>;
  timestamp: number;
}

/**
 * Gets the slugs of a post in both languages from Sanity
 * @param slug Current slug
 * @param currentLocale Current locale
 * @returns Object with slugs for each locale
 */
export async function getPostSlugsForAllLocales(slug: string, currentLocale: string): Promise<Record<string, string>> {
  const cacheKey = `${slug}-${currentLocale}`;

  // Check cache first
  const cached = slugMappingCache.get(cacheKey) as CacheEntry | undefined;
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // Find the post by its slug in the current locale
    const query = `*[_type == "post" && slug[$currentLocale].current == $slug][0] {
      "slugs": {
        "en": slug.en.current,
        "pl": slug.pl.current
      }
    }`;

    const result = await client.fetch(query, { slug, currentLocale });

    if (result && result.slugs) {
      // Cache the result
      slugMappingCache.set(cacheKey, {
        data: result.slugs,
        timestamp: Date.now()
      });
      return result.slugs;
    } else {
      // If no result found, return object with current slug for the current locale
      const fallback = { [currentLocale]: slug };
      slugMappingCache.set(cacheKey, {
        data: fallback,
        timestamp: Date.now()
      });
      return fallback;
    }
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    // Return object with current slug for the current locale as fallback
    const fallback = { [currentLocale]: slug };
    slugMappingCache.set(cacheKey, {
      data: fallback,
      timestamp: Date.now()
    });
    return fallback;
  }
}

/**
 * Client-side function to get slug mappings via API route
 * This is used when we need async slug resolution on the client
 */
export async function getPostSlugsClient(slug: string, currentLocale: string): Promise<Record<string, string>> {
  try {
    const response = await fetch(`/api/post-slugs?slug=${encodeURIComponent(slug)}&locale=${currentLocale}`);

    if (!response.ok) {
      throw new Error('Failed to fetch slug mappings');
    }

    const data = await response.json();
    return data.slugs || { [currentLocale]: slug };
  } catch (error) {
    console.error('Error fetching slug mappings from API:', error);
    return { [currentLocale]: slug };
  }
}

/**
 * Enhanced function to get the equivalent path in the target locale
 * Now supports async slug resolution for blog posts
 */
export async function getLocalizedPathAsync(
  pathname: string,
  targetLocale: string
): Promise<string> {
  // Handle root path
  if (pathname === '/' || pathname === '/en') {
    return targetLocale === 'en' ? '/en' : '/';
  }

  // Extract the clean path (without language prefix)
  let cleanPath = pathname;

  // Step 1: Remove the language prefix if it exists
  if (pathname.startsWith('/en/')) {
    cleanPath = pathname.substring(3); // Remove '/en/' prefix
  } else if (pathname.startsWith('/en')) {
    cleanPath = pathname.substring(3); // Remove '/en' prefix
    if (cleanPath === '') cleanPath = '/';
  }

  // Step 2: Handle knowledge base section paths
  if (cleanPath === '/baza-wiedzy' || cleanPath === '/knowledge-base') {
    if (targetLocale === 'en') {
      return '/en/knowledge-base';
    } else {
      return '/baza-wiedzy';
    }
  }

  // Step 3: Handle knowledge base article paths - WITH DYNAMIC SLUG MAPPING
  if (cleanPath.startsWith('/baza-wiedzy/') || cleanPath.startsWith('/knowledge-base/')) {
    const pathParts = cleanPath.split('/').filter(part => part.length > 0);

    // Extract the slug (section is pathParts[0])
    const slug = pathParts[1];

    // No slug, just the section
    if (!slug) {
      return targetLocale === 'en' ? '/en/knowledge-base' : '/baza-wiedzy';
    }

    // Determine current locale from the section
    const currentLocale = pathParts[0] === 'baza-wiedzy' ? 'pl' : 'en';

    try {
      // Get slug mappings from Sanity
      const slugMappings = await getPostSlugsForAllLocales(slug, currentLocale);

      // Get the slug for the target locale
      const targetSlug = slugMappings[targetLocale] || slug;

      // Build the path with the correct slug
      if (targetLocale === 'en') {
        return `/en/knowledge-base/${targetSlug}`;
      } else {
        return `/baza-wiedzy/${targetSlug}`;
      }
    } catch (error) {
      console.error('Error getting localized slug:', error);
      // Fallback to basic path translation
      if (targetLocale === 'en') {
        return `/en/knowledge-base/${slug}`;
      } else {
        return `/baza-wiedzy/${slug}`;
      }
    }
  }

  // Step 4: For other paths, handle prefix appropriately
  if (targetLocale === 'en') {
    // For English, ensure the path has the /en prefix
    return `/en${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
  } else {
    // For Polish, ensure there's no /pl prefix
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
}

/**
 * Synchronous version for backwards compatibility
 * Gets the equivalent path in the target locale
 * Handles special cases like blog posts with different slugs
 */
export function getLocalizedPath(
  pathname: string,
  targetLocale: string
): string {
  // Handle root path
  if (pathname === '/' || pathname === '/en') {
    return targetLocale === 'en' ? '/en' : '/';
  }

  // Extract the clean path (without language prefix)
  let cleanPath = pathname;

  // Step 1: Remove the language prefix if it exists
  if (pathname.startsWith('/en/')) {
    cleanPath = pathname.substring(3); // Remove '/en/' prefix
  } else if (pathname.startsWith('/en')) {
    cleanPath = pathname.substring(3); // Remove '/en' prefix
    if (cleanPath === '') cleanPath = '/';
  }

  // Step 2: Handle knowledge base section paths
  if (cleanPath === '/baza-wiedzy' || cleanPath === '/knowledge-base') {
    if (targetLocale === 'en') {
      return '/en/knowledge-base';
    } else {
      return '/baza-wiedzy';
    }
  }

  // Step 3: Handle knowledge base article paths - BASIC MAPPING (for sync usage)
  if (cleanPath.startsWith('/baza-wiedzy/') || cleanPath.startsWith('/knowledge-base/')) {
    const pathParts = cleanPath.split('/').filter(part => part.length > 0);

    // Extract the slug (section is pathParts[0])
    const slug = pathParts[1];

    // No slug, just the section
    if (!slug) {
      return targetLocale === 'en' ? '/en/knowledge-base' : '/baza-wiedzy';
    }

    // For synchronous usage, we can only do basic section translation
    // The actual slug mapping will be handled by the enhanced language switcher
    if (targetLocale === 'en') {
      return `/en/knowledge-base/${slug}`;
    } else {
      return `/baza-wiedzy/${slug}`;
    }
  }

  // Step 4: For other paths, handle prefix appropriately
  if (targetLocale === 'en') {
    // For English, ensure the path has the /en prefix
    return `/en${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
  } else {
    // For Polish, ensure there's no /pl prefix
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
} 
