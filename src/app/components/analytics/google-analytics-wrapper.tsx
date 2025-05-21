'use client';

import { useEffect, useState } from 'react';
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

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consent ? 'granted' : 'denied'
      });
    }
  }, [consent, scriptLoaded, isProduction]);

  // Initialize GA4 with Consent Mode v2
  const initializeGA = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...parameters: any[]) {
      window.dataLayer.push(parameters);
    }
    window.gtag = gtag;

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

    // Set current consent state if already determined
    if (consent) {
      gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }

    // Configure GA4
    gtag('config', measurementId, {
      anonymize_ip: true, // IP anonymization for GDPR compliance
      send_page_view: consent, // Only send page view if consent is granted
      cookie_flags: 'SameSite=Lax;Secure' // Modern cookie settings
    });

    setScriptLoaded(true);
  };

  // If not in production, don't render the script
  if (!isProduction) {
    return null;
  }

  return (
    <>
      {/* Load the main GTM script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={initializeGA}
      />

      {/* Initialize dataLayer and gtag function */}
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
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
            cookie_flags: 'SameSite=Lax;Secure'
          });
        `}
      </Script>
    </>
  );
} 
