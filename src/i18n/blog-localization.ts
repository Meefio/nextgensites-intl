/**
 * Utility for handling blog post localization between different languages
 */

// Translation map for blog posts slugs between languages
export const blogPostTranslations: Record<string, Record<string, string>> = {
  // Polish to English
  'przyklad-wpisu-wykorzystujacego-wszystkie-komponenty': {
    en: 'example-post-using-all-components'
  },
  'jak-wybrac-strone-internetowa-dla-swojej-firmy': {
    en: 'how-to-choose-a-website-for-your-business'
  },
  'dlaczego-nextjs-to-przyszlosc-stron-internetowych-dla-biznesu': {
    en: 'why-nextjs-is-the-future-of-business-websites'
  },
  'nowoczesna-strona-internetowa-co-to-wlasciwie-znaczy': {
    en: 'modern-website-what-does-it-actually-mean'
  },
  // English to Polish
  'example-post-using-all-components': {
    pl: 'przyklad-wpisu-wykorzystujacego-wszystkie-komponenty'
  },
  'how-to-choose-a-website-for-your-business': {
    pl: 'jak-wybrac-strone-internetowa-dla-swojej-firmy'
  },
  'why-nextjs-is-the-future-of-business-websites': {
    pl: 'dlaczego-nextjs-to-przyszlosc-stron-internetowych-dla-biznesu'
  },
  'modern-website-what-does-it-actually-mean': {
    pl: 'nowoczesna-strona-internetowa-co-to-wlasciwie-znaczy'
  }
}

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
 * Gets the equivalent path in the target locale
 * Handles special cases like blog posts with different slugs
 */
export function getLocalizedPath(
  pathname: string,
  targetLocale: string
): string | { pathname: string; params?: Record<string, string> } {
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
    const slug = pathParts[1];

    // No slug, just the section
    if (!slug) {
      return targetLocale === 'en' ? '/en/knowledge-base' : '/baza-wiedzy';
    }

    // Get the translated slug if available
    const translatedSlug = blogPostTranslations[slug]?.[targetLocale] || slug;

    // Format the path based on the target locale
    if (targetLocale === 'en') {
      // For English, we need a special format for next-intl Link
      return `/en/knowledge-base/${translatedSlug}`;
    } else {
      // For Polish (default locale), we use a regular string URL
      return `/baza-wiedzy/${translatedSlug}`;
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
