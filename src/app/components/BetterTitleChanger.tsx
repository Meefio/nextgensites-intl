'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import usePageVisibility from '../hooks/use-page-visibility';
import { usePathname } from 'next/navigation';

interface BetterTitleChangerProps {
  defaultTitle: string;
}

/**
 * Komponent do zmiany tytułu strony, gdy użytkownik przejdzie na inną kartę
 */
export default function BetterTitleChanger({ defaultTitle }: BetterTitleChangerProps) {
  const isHidden = usePageVisibility();
  const pathname = usePathname(); // Hook do śledzenia ścieżki URL
  const t = useTranslations('PageTitle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const titleIndexRef = useRef<number>(0);
  const originalTitleRef = useRef<string>("");

  // Lista alternatywnych tytułów z tłumaczeń opakowana w useMemo
  const alternativeTitles = useMemo(() => [
    `${t('whereAreYou')} | NextGenSites`,
    `${t('comeBack')} | NextGenSites`,
    `${t('missYou')} | NextGenSites`
  ], [t]); // zależność tylko od funkcji tłumaczącej

  // Efekt przechowujący oryginalny tytuł - uruchamiany przy zmianie ścieżki
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Zapamiętaj aktualny tytuł strony przy każdej zmianie URL
      originalTitleRef.current = document.title || defaultTitle;
    }
  }, [pathname, defaultTitle]); // Dodajemy pathname jako zależność

  // Efekt reagujący na zmiany stanu widoczności
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Funkcja do zmiany tytułu
    const changeTitle = () => {
      titleIndexRef.current = (titleIndexRef.current + 1) % alternativeTitles.length;
      const newTitle = alternativeTitles[titleIndexRef.current];
      document.title = newTitle;
    };

    if (isHidden) {
      // Strona jest ukryta - natychmiast zmień tytuł
      titleIndexRef.current = 0;
      document.title = alternativeTitles[0];

      // Ustaw interwał dla kolejnych zmian
      intervalRef.current = setInterval(changeTitle, 3000);
    } else {
      // Strona jest widoczna - przywróć oryginalny tytuł
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      document.title = originalTitleRef.current;
    }

    // Czyszczenie przy odmontowaniu lub zmianie stanu
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHidden, alternativeTitles, pathname]); // Dodajemy pathname jako zależność

  // Komponent nie renderuje żadnego UI
  return null;
} 
