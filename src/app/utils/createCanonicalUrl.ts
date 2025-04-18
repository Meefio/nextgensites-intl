/**
 * Tworzy poprawny adres kanoniczny dla danej ścieżki
 * @param path - Ścieżka relatywna (np. '/buildwise', '/')
 * @param locale - Aktualny język
 * @returns Pełny adres kanoniczny
 */
export function createCanonicalUrl(path: string, locale: string): string {
  // Usuń wiodący slash jeśli istnieje, będzie dodany później
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path.slice(1) : path;

  // Ustal bazowy URL w zależności od lokalizacji
  const baseUrl = 'https://nextgensites.pl';
  const localePrefix = locale === 'pl' ? '' : `/${locale}`;

  // Zbuduj pełny adres URL
  return `${baseUrl}${localePrefix}${cleanPath ? `/${cleanPath}` : ''}`;
} 
