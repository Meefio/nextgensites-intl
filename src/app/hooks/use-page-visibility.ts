'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect page visibility (whether the tab is active or not)
 * @returns {boolean} true when the page is hidden, false when visible
 */
const usePageVisibility = (): boolean => {
  // Initialize with false to prevent hydration mismatch 
  // (server always assumes page is visible)
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Check API availability
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
      // API not available
      return;
    }

    // Initial state - wrapped in requestAnimationFrame for better 
    // compatibility with React 18's concurrent rendering
    const setInitialState = () => {
      if (document && typeof (document as any)[hidden] !== 'undefined') {
        setIsHidden(!!(document as any)[hidden]);
      }
    };

    // Use requestAnimationFrame for initial state to ensure DOM is ready
    if (typeof window.requestAnimationFrame !== 'undefined') {
      window.requestAnimationFrame(setInitialState);
    } else {
      setInitialState();
    }

    // Handler for visibility change
    const handleVisibilityChange = () => {
      if (document && typeof (document as any)[hidden] !== 'undefined') {
        setIsHidden(!!(document as any)[hidden]);
      }
    };

    // Add event listener
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    // Cleanup on unmount
    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return isHidden;
};

export default usePageVisibility; 
