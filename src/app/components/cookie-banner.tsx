"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { X, ArrowLeft } from "lucide-react";
import { AnimatedElement } from "@/app/components/motion/animated-element";
import { useAnalytics } from "./analytics/analytics-provider";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner() {
  const t = useTranslations('CookieBanner');
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Use the analytics provider for consent management
  const { consentStatus, updateConsent } = useAnalytics();

  const [localConsent, setLocalConsent] = useState<CookieConsent>({
    necessary: consentStatus.necessary,
    analytics: consentStatus.analytics,
    marketing: consentStatus.marketing,
  });

  // Initialize banner visibility
  useEffect(() => {
    // Check for stored consent
    const getCookieValue = (name: string) => {
      if (typeof document === 'undefined') return null;
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    };

    const savedConsentCookie = getCookieValue('cookieConsent');
    const savedConsentLocal = typeof localStorage !== 'undefined' ? localStorage.getItem('cookieConsent') : null;

    // Set isReady immediately to load component
    setIsReady(true);

    // Show banner if no consent is found or analytics consent is not given
    if (!savedConsentCookie && !savedConsentLocal) {
      // No consent at all - show banner after delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Parse saved consent to check analytics specifically
      let parsedConsent: CookieConsent | null = null;

      try {
        if (savedConsentCookie) {
          parsedConsent = JSON.parse(decodeURIComponent(savedConsentCookie));
        } else if (savedConsentLocal) {
          parsedConsent = JSON.parse(savedConsentLocal);
        }
      } catch (e) {
        console.log('Error parsing cookie consent:', e);
        // Invalid JSON - treat as no consent
        setShowBanner(true);
        return;
      }

      // Show banner if analytics consent is not explicitly true
      if (!parsedConsent || parsedConsent.analytics !== true) {
        // Analytics not consented - show banner immediately
        setShowBanner(true);
      }
    }
  }, []);

  // Update local consent when provider consent changes
  useEffect(() => {
    setLocalConsent({
      necessary: consentStatus.necessary,
      analytics: consentStatus.analytics,
      marketing: consentStatus.marketing,
    });
  }, [consentStatus]);

  // Helper function to set cookie with proper attributes
  const setCookieConsent = (consentData: CookieConsent) => {
    // Calculate expiry - 6 months (GDPR recommendation)
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);

    // Serialize consent data
    const consentString = JSON.stringify(consentData);

    // Set with secure attributes - SameSite=Lax is recommended for cookies that affect authentication
    document.cookie = `cookieConsent=${encodeURIComponent(consentString)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
  };

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    // Update consent using the provider
    updateConsent('necessary', true);
    updateConsent('analytics', true);
    updateConsent('marketing', true);

    // Save consent to cookies for server-side access
    setCookieConsent(newConsent);

    // Hide the banner
    setShowBanner(false);
  };

  // Handle rejecting all optional cookies
  const handleRejectAll = () => {
    const newConsent = {
      necessary: true, // Necessary cookies are always accepted
      analytics: false,
      marketing: false,
    };

    // Update consent using the provider
    updateConsent('necessary', true);
    updateConsent('analytics', false);
    updateConsent('marketing', false);

    // Save consent to cookies for server-side access
    setCookieConsent(newConsent);

    // Hide the banner
    setShowBanner(false);
  };

  // Handle accepting selected cookies
  const handleAcceptSelected = () => {
    // Update consent using the provider
    updateConsent('necessary', localConsent.necessary);
    updateConsent('analytics', localConsent.analytics);
    updateConsent('marketing', localConsent.marketing);

    // Save consent to cookies for server-side access
    setCookieConsent(localConsent);

    // Hide the banner
    setShowBanner(false);
  };

  if (!showBanner || !isReady) return null;

  return (
    <AnimatedElement
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 lg:inset-x-auto lg:right-4 lg:max-w-[500px]"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      exit={{ opacity: 0, y: 100, scale: 0.95 }}
    >
      <div className="relative mx-auto max-w-4xl lg:mx-0">
        <Card className="p-4 shadow-lg md:p-6">
          <AnimatedElement
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute right-2 top-2 flex gap-2"
          >
            {showDetails && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDetails(false)}
                aria-label={t('buttons.back')}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRejectAll}
              aria-label={t('closeButton')}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </AnimatedElement>

          <div className="space-y-3">
            <AnimatedElement
              as="h3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold"
              id="cookie-title"
            >
              {t('title')}
            </AnimatedElement>

            {!showDetails ? (
              <AnimatedElement
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p id="cookie-description" className="text-sm text-muted-foreground">
                  {t('mainDescription')}
                </p>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-2">
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    aria-label={t('buttons.rejectAll')}
                    size="sm"
                    className="lg:text-xs"
                  >
                    {t('buttons.rejectAll')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(true)}
                    aria-label={t('buttons.customize')}
                    size="sm"
                    className="lg:text-xs"
                  >
                    {t('buttons.customize')}
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    aria-label={t('buttons.acceptAll')}
                    size="sm"
                    className="lg:text-xs"
                  >
                    {t('buttons.acceptAll')}
                  </Button>
                </div>
              </AnimatedElement>
            ) : (
              <AnimatedElement
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p id="cookie-description" className="text-sm text-muted-foreground">
                  {t('detailedDescription')}
                </p>

                <div className="space-y-4 pt-4" role="group" aria-label="Cookie settings">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="necessary"
                      checked={localConsent.necessary}
                      disabled
                      aria-label={t('cookies.necessary.title')}
                    />
                    <label
                      htmlFor="necessary"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('cookies.necessary.title')}
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="analytics"
                      checked={localConsent.analytics}
                      onCheckedChange={(checked) =>
                        setLocalConsent(prev => ({ ...prev, analytics: checked as boolean }))
                      }
                      aria-label={t('cookies.analytics.title')}
                    />
                    <label htmlFor="analytics" className="text-sm font-medium leading-none">
                      {t('cookies.analytics.title')}
                      {process.env.NODE_ENV !== 'production' && (
                        <span className="ml-1 text-xs text-muted-foreground">(only active in production)</span>
                      )}
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={localConsent.marketing}
                      onCheckedChange={(checked) =>
                        setLocalConsent(prev => ({ ...prev, marketing: checked as boolean }))
                      }
                      aria-label={t('cookies.marketing.title')}
                    />
                    <label htmlFor="marketing" className="text-sm font-medium leading-none">
                      {t('cookies.marketing.title')}
                      {process.env.NODE_ENV !== 'production' && (
                        <span className="ml-1 text-xs text-muted-foreground">(only active in production)</span>
                      )}
                    </label>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {t('privacyLink.text')}{" "}
                  <Link href="/polityka-prywatnosci" className="underline hover:text-foreground">
                    {t('privacyLink.linkText')}
                  </Link>
                  .
                </p>

                <div className="flex flex-col gap-2 lg:flex-row lg:gap-2">
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    aria-label={t('buttons.rejectAll')}
                    size="sm"
                    className="lg:text-xs"
                  >
                    {t('buttons.rejectAll')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAcceptSelected}
                    aria-label={t('buttons.acceptSelected')}
                    size="sm"
                    className="lg:text-xs"
                  >
                    {t('buttons.acceptSelected')}
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    aria-label={t('buttons.acceptAll')}
                    size="sm"
                    className="lg:text-xs"
                  >
                    {t('buttons.acceptAll')}
                  </Button>
                </div>
              </AnimatedElement>
            )}
          </div>
        </Card>
      </div>
    </AnimatedElement>
  );
} 
