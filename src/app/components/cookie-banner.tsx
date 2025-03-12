"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { X, ArrowLeft } from "lucide-react";
import { AnimatedElement } from "@/app/components/motion/animated-element";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner() {
  const t = useTranslations('CookieBanner');
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Najpierw sprawdź zapisane zgody
    const savedConsent = localStorage.getItem("cookieConsent");

    // Ustaw domyślne wartości na denied
    if (typeof window.gtag !== 'undefined') {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
        wait_for_update: 500
      });
    }

    if (savedConsent) {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      setTimeout(() => {
        updateGtagConsent(parsedConsent);
      }, 100);
    } else {
      const timer = setTimeout(() => {
        setShowBanner(true);
        setIsReady(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const updateGtagConsent = (consentData: CookieConsent) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag("consent", "update", {
        analytics_storage: consentData.analytics ? "granted" : "denied",
        ad_storage: consentData.marketing ? "granted" : "denied",
        functionality_storage: consentData.necessary ? "granted" : "denied",
        personalization_storage: consentData.marketing ? "granted" : "denied",
        security_storage: "granted"
      });
    }
  };

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(newConsent);
  };

  const handleRejectAll = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(newConsent);
  };

  const handleAcceptSelected = () => {
    saveConsent(consent);
  };

  const saveConsent = (consentData: CookieConsent) => {
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    setConsent(consentData);
    setShowBanner(false);
    updateGtagConsent(consentData);
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
                      checked={consent.necessary}
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
                      checked={consent.analytics}
                      onCheckedChange={(checked) =>
                        setConsent(prev => ({ ...prev, analytics: checked as boolean }))
                      }
                      aria-label={t('cookies.analytics.title')}
                    />
                    <label htmlFor="analytics" className="text-sm font-medium leading-none">
                      {t('cookies.analytics.title')}
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={consent.marketing}
                      onCheckedChange={(checked) =>
                        setConsent(prev => ({ ...prev, marketing: checked as boolean }))
                      }
                      aria-label={t('cookies.marketing.title')}
                    />
                    <label htmlFor="marketing" className="text-sm font-medium leading-none">
                      {t('cookies.marketing.title')}
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

                <div className="flex flex-col gap-2 lg:flex-row lg:gap-1">
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
