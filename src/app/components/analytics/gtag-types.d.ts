// Type definitions for Google's gtag.js
interface Window {
  gtag: (
    command: 'consent' | 'config' | 'event',
    action: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
  dataLayer: any[];
}

// Custom event for cookie consent changes
interface CustomEventMap {
  'cookieConsentChange': CustomEvent<{
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  }>;
}

declare global {
  interface WindowEventMap extends CustomEventMap { }
} 
