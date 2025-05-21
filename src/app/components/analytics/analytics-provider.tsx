'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import GoogleAnalyticsWrapper from './google-analytics-wrapper';

type AnalyticsContextType = {
  consentStatus: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  updateConsent: (type: 'analytics' | 'marketing' | 'necessary', value: boolean) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  consentStatus: {
    necessary: true, // Necessary cookies are always required
    analytics: false,
    marketing: false,
  },
  updateConsent: () => { },
});

export const useAnalytics = () => useContext(AnalyticsContext);

type AnalyticsProviderProps = {
  children: React.ReactNode;
  initialConsent?: {
    necessary?: boolean;
    analytics?: boolean;
    marketing?: boolean;
  };
  googleAnalyticsId?: string;
};

export default function AnalyticsProvider({
  children,
  initialConsent = {},
  googleAnalyticsId,
}: AnalyticsProviderProps) {
  const [consentStatus, setConsentStatus] = useState({
    necessary: initialConsent.necessary ?? true, // Always true by default
    analytics: initialConsent.analytics ?? false,
    marketing: initialConsent.marketing ?? false,
  });

  const updateConsent = (type: 'analytics' | 'marketing' | 'necessary', value: boolean) => {
    setConsentStatus((prev) => {
      const updatedConsent = { ...prev, [type]: value };

      // Save consent status to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cookieConsent', JSON.stringify(updatedConsent));
      }

      // Dispatch custom event for consent change
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('cookieConsentChange', {
          detail: updatedConsent
        });
        window.dispatchEvent(event);
      }

      return updatedConsent;
    });
  };

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
          const parsedConsent = JSON.parse(savedConsent);
          setConsentStatus((prev) => ({
            ...prev,
            ...parsedConsent,
          }));
        }
      } catch (error) {
        console.error('Error loading consent from localStorage:', error);
      }
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ consentStatus, updateConsent }}>
      {children}

      {/* Include Google Analytics only if ID is provided */}
      {googleAnalyticsId && process.env.NODE_ENV === 'production' && (
        <GoogleAnalyticsWrapper
          measurementId={googleAnalyticsId}
          initialConsent={consentStatus.analytics}
        />
      )}
    </AnalyticsContext.Provider>
  );
} 
