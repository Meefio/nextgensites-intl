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
    if (consent.analytics && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }, [consent.analytics]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Domyślnie ustawiamy brak zgody na śledzenie
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });
            
            // Konfiguracja Google Analytics
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
} 
