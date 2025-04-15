'use client';

import { useEffect, useState } from 'react';

/**
 * Hook do wykrywania widoczności strony (czy karta jest aktywna czy nie)
 * @returns {boolean} true gdy strona jest ukryta, false gdy jest widoczna
 */
const usePageVisibility = (): boolean => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    // Sprawdzenie czy jesteśmy w przeglądarce
    if (typeof document === 'undefined') {
      return;
    }

    // Sprawdź dostępność API
    let hidden: string;
    let visibilityChange: string;

    if (typeof document.hidden !== 'undefined') {
      // Standard API
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof (document as any).msHidden !== 'undefined') {
      // Microsoft API
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof (document as any).webkitHidden !== 'undefined') {
      // WebKit API
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    } else {
      // API niedostępne
      return;
    }

    // Początkowy stan
    setIsHidden(!!(document as any)[hidden]);

    // Handler zmiany stanu widoczności
    const handleVisibilityChange = () => {
      setIsHidden(!!(document as any)[hidden]);
    };

    // Dodanie nasłuchiwania
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    // Czyszczenie przy odmontowaniu
    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return isHidden;
};

export default usePageVisibility; 
