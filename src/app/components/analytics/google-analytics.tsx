"use client";

import { useEffect } from "react";
import Script from "next/script";

// Deklaracja typów dla Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
  consent: {
    analytics: boolean;
  };
};

export function GoogleAnalytics({ measurementId, consent }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied"
      });
    }
  }, [consent.analytics]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        data-cookieconsent="analytics"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        data-cookieconsent="analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Domyślna konfiguracja zgód
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
            
            // Konfiguracja Google Analytics
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
} 
