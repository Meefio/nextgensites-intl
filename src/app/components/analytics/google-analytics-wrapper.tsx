'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import Script from 'next/script';

type GoogleAnalyticsWrapperProps = {
  measurementId: string;
  initialConsent: boolean;
};

export default function GoogleAnalyticsWrapper({ measurementId, initialConsent }: GoogleAnalyticsWrapperProps) {
  // Always call hooks at the top level, regardless of conditions
  const [consent, setConsent] = useState(initialConsent);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const isProduction = process.env.NODE_ENV === 'production';

  // Update consent when prop changes
  useEffect(() => {
    setConsent(initialConsent);
  }, [initialConsent]);

  // Update consent when cookie consent changes
  useEffect(() => {
    // Skip effect functionality in non-production but still call the hook
    if (!isProduction) return;

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
  }, [isProduction]);

  // Update analytics_storage consent when consent changes
  useEffect(() => {
    // Skip effect functionality in non-production but still call the hook
    if (!isProduction || !scriptLoaded) return;

    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: consent ? 'granted' : 'denied'
        });
      }
    } catch (error) {
      console.error('Error updating consent:', error);
    }
  }, [consent, scriptLoaded, isProduction]);

  // If not in production, don't render the script
  if (!isProduction) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      {/* Load GTM script with proper attributes for security */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
        crossOrigin="anonymous"
      />

      {/* Initialize dataLayer and gtag function */}
      <Script id="google-analytics-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          
          gtag('js', new Date());
          
          // Initialize with default consent state (denied for all)
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          
          ${consent ? `
          // Consent already granted
          gtag('consent', 'update', {
            analytics_storage: 'granted'
          });
          ` : ''}
          
          // Configure GA4
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            send_page_view: ${consent},
            cookie_flags: 'SameSite=Lax;Secure',
            transport_type: 'beacon'
          });
        `}
      </Script>
    </Suspense>
  );
} 
