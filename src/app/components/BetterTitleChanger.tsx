'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import usePageVisibility from '../hooks/use-page-visibility';
import { usePathname } from 'next/navigation';

interface BetterTitleChangerProps {
  defaultTitle?: string;
}

/**
 * Component to change the document title when user switches to another tab
 */
export default function BetterTitleChanger({ defaultTitle = 'NextGenSites' }: BetterTitleChangerProps) {
  const isHidden = usePageVisibility();
  const pathname = usePathname();
  const t = useTranslations('PageTitle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const titleIndexRef = useRef<number>(0);
  const originalTitleRef = useRef<string>("");

  // Memoize alternative titles to avoid recalculation
  const alternativeTitles = useMemo(() => [
    `${t('whereAreYou')} | NextGenSites`,
    `${t('comeBack')} | NextGenSites`,
    `${t('missYou')} | NextGenSites`
  ], [t]);

  // Store original title when path changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Small delay to ensure metadata title is properly set before capturing
    const timeoutId = setTimeout(() => {
      originalTitleRef.current = document.title || defaultTitle;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, defaultTitle]);

  // Effect for handling visibility changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const changeTitle = () => {
      if (typeof window === 'undefined') return;

      titleIndexRef.current = (titleIndexRef.current + 1) % alternativeTitles.length;
      const newTitle = alternativeTitles[titleIndexRef.current];
      document.title = newTitle;
    };

    if (isHidden) {
      // Page is hidden - change title immediately
      titleIndexRef.current = 0;
      document.title = alternativeTitles[0];

      // Set interval for subsequent changes
      intervalRef.current = setInterval(changeTitle, 3000);
    } else {
      // Page is visible - restore original title
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Only set title if we have a stored original title
      if (originalTitleRef.current) {
        document.title = originalTitleRef.current;
      }
    }

    // Cleanup on unmount or state change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHidden, alternativeTitles]);

  // Component doesn't render any UI
  return null;
} 
