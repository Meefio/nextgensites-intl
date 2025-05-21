/**
 * Utility for handling blog post localization between different languages
 */
import { client } from '@/lib/sanity/client';
import { KNOWLEDGE_BASE_PATHS } from '@/lib/constants';

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
 * Gets the slugs of a post in both languages from Sanity
 * @param slug Current slug
 * @param currentLocale Current locale
 * @returns Object with slugs for each locale
 */
export async function getPostSlugsForAllLocales(slug: string, currentLocale: string): Promise<Record<string, string>> {
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
      return result.slugs;
    } else {
      // If no result found, return object with current slug for the current locale
      return { [currentLocale]: slug };
    }
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    // Return object with current slug for the current locale as fallback
    return { [currentLocale]: slug };
  }
}

/**
 * Gets the equivalent path in the target locale
 * Handles special cases like blog posts with different slugs
 */
export function getLocalizedPath(
  pathname: string,
  targetLocale: string
): string | Promise<string> {
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

  // Step 3: Handle knowledge base article paths
  if (cleanPath.startsWith('/baza-wiedzy/') || cleanPath.startsWith('/knowledge-base/')) {
    const pathParts = cleanPath.split('/').filter(part => part.length > 0);

    // Extract the section and slug
    const section = pathParts[0];
    const slug = pathParts[1];

    // No slug, just the section
    if (!slug) {
      return targetLocale === 'en' ? '/en/knowledge-base' : '/baza-wiedzy';
    }

    // For client-side language switching, we can't use async functions directly
    // We'll return a simple path based on the current information
    if (targetLocale === 'en') {
      // For English, we use the knowledge base path with the given slug
      return `/en/knowledge-base/${slug}`;
    } else {
      // For Polish, we use the baza-wiedzy path with the given slug
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
