'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';

type GoogleAnalyticsWrapperProps = {
  measurementId: string;
  initialConsent: boolean;
};

export default function GoogleAnalyticsWrapper({ measurementId, initialConsent }: GoogleAnalyticsWrapperProps) {
  const [consent, setConsent] = useState(initialConsent);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Update consent when prop changes
  useEffect(() => {
    setConsent(initialConsent);
  }, [initialConsent]);

  // Update consent when cookie consent changes
  useEffect(() => {
    const handleCookieConsentChange = (event: CustomEvent<{
      necessary: boolean;
      analytics: boolean;
      marketing: boolean;
    }>) => {
      if (event.detail && typeof event.detail.analytics === 'boolean') {
        setConsent(event.detail.analytics);
      }
    };

    // Listen for custom consent events
    window.addEventListener('cookieConsentChange', handleCookieConsentChange as EventListener);

    return () => {
      window.removeEventListener('cookieConsentChange', handleCookieConsentChange as EventListener);
    };
  }, []);

  // Update analytics_storage consent when consent changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consent ? 'granted' : 'denied'
      });
    }
  }, [consent]);

  if (!consent) {
    return null;
  }

  return <GoogleAnalytics gaId={measurementId} />;
} 
