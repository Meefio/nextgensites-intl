"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { X } from "lucide-react";
import { AnimatedElement } from "@/app/components/motion/animated-element";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    if (!savedConsent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
        setIsReady(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

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
    setShowBanner(false);
    
    if (consentData.analytics) {
      // Włącz PostHog
    }
    
    if (consentData.marketing) {
      // Włącz skrypty marketingowe
    }
  };

  if (!showBanner || !isReady) return null;

  return (
    <AnimatedElement
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 lg:inset-x-auto lg:right-4 lg:max-w-[450px]"
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
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={handleRejectAll}
              aria-label="Zamknij banner plików cookie"
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
              Szanujemy Twoją prywatność
            </AnimatedElement>
            
            {!showDetails ? (
              <AnimatedElement
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p id="cookie-description" className="text-sm text-muted-foreground">
                  Ta strona używa plików cookie, aby zapewnić najlepsze wrażenia z korzystania z naszej witryny. 
                  Możesz zaakceptować wszystkie, odrzucić opcjonalne lub dostosować swoje preferencje.
                </p>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleRejectAll}
                    aria-label="Odrzuć wszystkie pliki cookie"
                    size="sm"
                    className="lg:text-xs"
                  >
                    Odrzuć wszystkie
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowDetails(true)}
                    aria-label="Dostosuj ustawienia plików cookie"
                    size="sm"
                    className="lg:text-xs"
                  >
                    Dostosuj
                  </Button>
                  <Button 
                    onClick={handleAcceptAll}
                    aria-label="Zaakceptuj wszystkie pliki cookie"
                    size="sm"
                    className="lg:text-xs"
                  >
                    Zaakceptuj wszystkie
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
                  Używamy plików cookie, aby poprawić Twoje wrażenia z korzystania z naszej strony. 
                  Niektóre z nich są niezbędne do funkcjonowania podstawowych funkcji, podczas gdy 
                  inne pomagają nam zrozumieć, w jaki sposób korzystasz z witryny i jak możemy ją ulepszyć.
                </p>

                <div className="space-y-4 pt-4" role="group" aria-label="Ustawienia plików cookie">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="necessary" 
                      checked={consent.necessary} 
                      disabled 
                      aria-label="Niezbędne pliki cookie (wymagane)"
                    />
                    <label 
                      htmlFor="necessary" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Niezbędne (wymagane)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="analytics" 
                      checked={consent.analytics}
                      onCheckedChange={(checked) => 
                        setConsent(prev => ({...prev, analytics: checked as boolean}))
                      }
                      aria-label="Analityczne pliki cookie (PostHog)"
                    />
                    <label htmlFor="analytics" className="text-sm font-medium leading-none">
                      Analityczne (PostHog)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="marketing" 
                      checked={consent.marketing}
                      onCheckedChange={(checked) => 
                        setConsent(prev => ({...prev, marketing: checked as boolean}))
                      }
                      aria-label="Marketingowe pliki cookie"
                    />
                    <label htmlFor="marketing" className="text-sm font-medium leading-none">
                      Marketingowe
                    </label>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Więcej informacji znajdziesz w naszej{" "}
                  <Link href="/polityka-prywatnosci" className="underline hover:text-foreground">
                    Polityce Prywatności
                  </Link>
                  .
                </p>

                <div className="flex flex-col gap-2 lg:flex-row lg:gap-1">
                  <Button 
                    variant="outline" 
                    onClick={handleRejectAll}
                    aria-label="Odrzuć wszystkie pliki cookie"
                    size="sm"
                    className="lg:text-xs"
                  >
                    Odrzuć wszystkie
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleAcceptSelected}
                    aria-label="Zaakceptuj wybrane pliki cookie"
                    size="sm"
                    className="lg:text-xs"
                  >
                    Zaakceptuj wybrane
                  </Button>
                  <Button 
                    onClick={handleAcceptAll}
                    aria-label="Zaakceptuj wszystkie pliki cookie"
                    size="sm"
                    className="lg:text-xs"
                  >
                    Zaakceptuj wszystkie
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
