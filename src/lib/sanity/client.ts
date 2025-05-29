import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Set up Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-05-21', // use current date in YYYY-MM-DD format
  useCdn: process.env.NODE_ENV === 'production',
  // token: process.env.SANITY_API_TOKEN, // Only needed if you want to update content
});

// Set up image URL builder
const builder = imageUrlBuilder(client);

/**
 * Helper function to build Sanity image URLs
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Helper function to get localized values from Sanity content
 */
export function getLocalizedValue<T>(obj: Record<string, T> | undefined, locale: string, fallbackLocale = 'en'): T | undefined {
  if (!obj) return undefined;

  // Return value for requested locale if it exists
  if (obj[locale]) return obj[locale];

  // Fallback to default locale
  if (obj[fallbackLocale]) return obj[fallbackLocale];

  // Last resort: return first available value
  const firstAvailableValue = Object.values(obj)[0];
  return firstAvailableValue;
}

/**
 * Helper function specifically for excerpt with better fallback
 */
export function getLocalizedExcerpt(post: any, locale: string): string {
  if (!post.excerpt) {
    return locale === 'pl'
      ? 'Brak dostępnego opisu artykułu.'
      : 'No excerpt available for this article.';
  }

  // Try to get excerpt in requested locale
  if (post.excerpt[locale]) {
    return post.excerpt[locale];
  }

  // Fallback to English
  if (post.excerpt['en']) {
    return post.excerpt['en'];
  }

  // Fallback to Polish
  if (post.excerpt['pl']) {
    return post.excerpt['pl'];
  }

  // Last resort: first available value or default message
  const firstValue = Object.values(post.excerpt)[0] as string;
  return firstValue || (locale === 'pl'
    ? 'Brak dostępnego opisu artykułu.'
    : 'No excerpt available for this article.');
} 
