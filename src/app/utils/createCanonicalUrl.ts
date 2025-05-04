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

/**
 * Tworzy konfigurację alternatywnych URL-i dla metadanych (wraz z x-default)
 * @param plPath - Ścieżka dla wersji polskiej (np. '/strona-internetowa', '/')
 * @param enPath - Ścieżka dla wersji angielskiej (np. '/website', '/')
 * @param defaultLocale - Domyślny język dla x-default (domyślnie 'pl')
 * @returns Obiekty z URLs dla języków oraz x-default
 */
export function createLanguageAlternates(
  plPath: string, 
  enPath: string, 
  defaultLocale: string = 'pl'
): { [key: string]: string } {
  const defaultPath = defaultLocale === 'pl' ? plPath : enPath;
  
  return {
    'pl': createCanonicalUrl(plPath, 'pl'),
    'en': createCanonicalUrl(enPath, 'en'),
    'x-default': createCanonicalUrl(defaultPath, defaultLocale)
  };
} 
