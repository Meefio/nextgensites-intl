/**
 * Format a date for a specific locale
 */
export function formatDateForLocale(dateString: string, locale: string): string {
  try {
    const date = new Date(dateString);

    // Default formatting for both locales
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return date.toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', options);
  } catch (error) {
    // Fallback if date is invalid
    return dateString;
  }
}

/**
 * Format a date as ISO string (YYYY-MM-DD)
 */
export function formatDateAsIso(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    return dateString;
  }
}

/**
 * Calculate approximate reading time for text
 * @param text Text content to calculate reading time for
 * @param wordsPerMinute Reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  if (!text) return 0;

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return Math.max(1, minutes); // Return at least 1 minute
}

/**
 * Format reading time based on locale
 */
export function formatReadingTime(minutes: number, locale: string): string {
  if (locale === 'pl') {
    return `${minutes} min czytania`;
  }

  return `${minutes} min read`;
} 
