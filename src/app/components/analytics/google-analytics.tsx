"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  useEffect(() => {
    if (consent.analytics && window.gtag) {
      // Aktualizacja zgody
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });

      // Wysłanie page_view po udzieleniu zgody
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [consent.analytics, pathname]);

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
            
            // Domyślna konfiguracja zgód
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            
            // Konfiguracja GA4
            gtag('config', '${measurementId}', {
              send_page_view: false, 
              page_path: '${pathname}',
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              restricted_data_processing: true,
              ads_data_redaction: true
            });
          `,
        }}
      />
    </>
  );
} 
