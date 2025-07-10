'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Pokaż przycisk tylko gdy scrollujemy w górę i jesteśmy poniżej 300px
          if (currentScrollY < lastScrollY.current && currentScrollY > 300) {
            setIsVisible((prev) => !prev ? true : prev);
          } else {
            setIsVisible((prev) => prev ? false : prev);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-3 right-5 z-50 rounded-xl bg-secondary p-2 text-accent shadow-lg transition-all duration-300 hover:scale-110',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      )}
      aria-label="Przewiń do góry"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}; 
