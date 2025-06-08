'use client';

import { ArrowRight, Smartphone, Zap, TrendingUp, Users, Clock, Star, Award, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AnimatedElement } from "@/app/components/motion/animated-element";
import { AnimatedCounter } from "@/app/components/ui/animated-counter";

interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  // Lokalne tłumaczenia nagłówków
  const headerTranslations = {
    pl: {
      why: "NASZE REZULTATY",
      heading: "Szablony Framer dla Twojego biznesu",
      subheading: "Profesjonalne, gotowe do użycia szablony z zaawansowanymi animacjami"
    },
    en: {
      why: "OUR RESULTS",
      heading: "Framer Templates for Your Business",
      subheading: "Professional, ready-to-use templates with advanced animations"
    }
  };

  const headerContent = headerTranslations[locale as keyof typeof headerTranslations] || headerTranslations.pl;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const t = {
    pl: {
      badge: "Najlepsze szablony stron internetowych",
      title: "Szablony",
      subtitle: "Framer",
      description: "Profesjonalne strony internetowe oparte na gotowych szablonach Framer. Szybka realizacja, niższe koszty, pełna personalizacja.",
      stats: [
        { value: 90, suffix: "%", label: "Szybsza realizacja" },
        { value: 70, suffix: "%", label: "Niższe koszty" },
        { value: 100, suffix: "%", label: "Responsywności" }
      ],
      primaryButton: "Zobacz szablony",
      secondaryButton: "Poznaj zalety",
      features: [
        {
          icon: Smartphone,
          title: "Responsywny Design",
          description: "Idealne wyświetlanie na wszystkich urządzeniach"
        },
        {
          icon: Zap,
          title: "Zaawansowane Animacje",
          description: "Płynne animacje zwiększające zaangażowanie"
        },
        {
          icon: TrendingUp,
          title: "SEO Optimized",
          description: "Optymalizacja dla wyszukiwarek Google"
        }
      ],
      resultsTitle: "Nasze wyniki mówią same za siebie",
      resultsDescription: "Odkryj, dlaczego lokalne firmy wybierają nasze szablony Framer do rozwoju swojego biznesu online",
      statsCards: [
        {
          value: "100%",
          title: "Zadowolonych klientów",
          description: "Realizujemy projekty dla firm z całej Polski",
          icon: Users
        },
        {
          value: "7 dni",
          title: "Średni czas realizacji",
          description: "Od wyboru szablonu do gotowej strony",
          icon: Clock
        },
        {
          value: "98%",
          title: "Wskaźnik zadowolenia",
          description: "Nasi klienci polecają nasze usługi",
          icon: Star
        },
        {
          value: "Pro",
          title: "Doświadczenie zawodowe",
          description: "Specjalizujemy się w profesjonalnych projektach webowych",
          icon: Award
        }
      ],
      successTitle: "Dołącz do grona zadowolonych klientów",
      successDescription: "Każdy projekt to historia sukcesu. Nasze szablony Framer pomagają firmom osiągać cele biznesowe szybciej i efektywniej.",
      successStats: [
        { value: 150, suffix: "%", label: "Wzrost konwersji" },
        { value: 60, suffix: "%", label: "Szybsze ładowanie" },
        { value: 300, suffix: "%", label: "Więcej zapytań" }
      ]
    },
    en: {
      badge: "Best website templates",
      title: "Framer",
      subtitle: "templates",
      description: "Professional websites based on ready-made Framer templates. Fast delivery, lower costs, full customization.",
      stats: [
        { value: 90, suffix: "%", label: "Faster delivery" },
        { value: 70, suffix: "%", label: "Lower costs" },
        { value: 100, suffix: "%", label: "Responsiveness" }
      ],
      primaryButton: "View Templates",
      secondaryButton: "Learn Benefits",
      features: [
        {
          icon: Smartphone,
          title: "Responsive Design",
          description: "Perfect display on all devices"
        },
        {
          icon: Zap,
          title: "Advanced Animations",
          description: "Smooth animations increasing engagement"
        },
        {
          icon: TrendingUp,
          title: "SEO Optimized",
          description: "Optimization for Google search engines"
        }
      ],
      resultsTitle: "Our results speak for themselves",
      resultsDescription: "Discover why local businesses choose our Framer templates to grow their online business",
      statsCards: [
        {
          value: "100%",
          title: "Satisfied clients",
          description: "We deliver projects for companies across Poland",
          icon: Users
        },
        {
          value: "7 days",
          title: "Average delivery time",
          description: "From template selection to ready website",
          icon: Clock
        },
        {
          value: "98%",
          title: "Satisfaction rate",
          description: "Our clients recommend our services",
          icon: Star
        },
        {
          value: "Pro",
          title: "Professional experience",
          description: "We specialize in professional web projects",
          icon: Award
        }
      ],
      successTitle: "Join our satisfied clients",
      successDescription: "Every project is a success story. Our Framer templates help businesses achieve their goals faster and more efficiently.",
      successStats: [
        { value: 150, suffix: "%", label: "Conversion growth" },
        { value: 60, suffix: "%", label: "Faster loading" },
        { value: 300, suffix: "%", label: "More inquiries" }
      ]
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  return (
    <>
      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden max-w-6xl mx-auto">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10 pt-8 pb-8 md:pt-10 md:pb-10">
          <AnimatedElement
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 md:px-6 md:py-3 rounded-full mb-6 md:mb-8"
            delay={0.1}
          >
            <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm font-medium">{content.badge}</span>
          </AnimatedElement>

          <AnimatedElement
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight"
            delay={0.2}
          >
            <span className="text-foreground">{content.title} </span>
            <span className="text-primary">{content.subtitle}</span>
          </AnimatedElement>

          <AnimatedElement
            as="p"
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
            delay={0.3}
          >
            {content.description}
          </AnimatedElement>

          {/* Stats Section */}
          <AnimatedElement
            className="hidden md:flex md:flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center mb-8 md:mb-12"
            delay={0.4}
          >
            {content.stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 md:gap-4 bg-black/50 backdrop-blur-xl border border-primary/10 rounded-full px-4 py-3 md:px-6 md:py-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
              >
                <div className="text-sm md:text-base font-bold text-primary">
                  <AnimatedCounter
                    endValue={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </AnimatedElement>

          <AnimatedElement
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 md:mb-10 mt-12 md:mt-20"
            delay={0.5}
          >
            <Button
              size="lg"
              onClick={scrollToPortfolio}
              className="w-full sm:w-auto"
            >
              {content.primaryButton}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto"
            >
              <Rocket className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              {content.secondaryButton}
            </Button>
          </AnimatedElement>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20 pt-8 md:pt-12">
            {content.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <AnimatedElement
                  key={index}
                  className="relative group"
                  delay={0.6 + index * 0.1}
                >
                  <div className="text-center p-6 md:p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:bg-card/50">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <AnimatedElement
              className="flex flex-col gap-2 md:gap-3"
              delay={0.1}
              viewport={{ once: true, margin: "-20% 0px" }}
            >
              <span className='font-bold uppercase text-primary text-sm md:text-base'>
                {headerContent.why}
              </span>
              <h2 className='font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-balance max-w-[800px] mx-auto px-4'>
                {headerContent.heading}
              </h2>
              <p className='text-base md:text-lg text-muted-foreground text-balance max-w-[800px] mx-auto px-4'>
                {headerContent.subheading}
              </p>
            </AnimatedElement>
          </div>

          {/* Success Stories Section */}
          <AnimatedElement delay={0.6}>
            <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-3xl p-6 md:p-10 text-center max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                {content.successStats.map((stat, index) => (
                  <AnimatedElement
                    key={index}
                    className="text-center group"
                    delay={0.8 + index * 0.1}
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter
                        endValue={stat.value}
                        suffix={stat.suffix}
                        duration={2500}
                      />
                    </div>
                    <div className="text-sm md:text-lg text-foreground font-medium">
                      {stat.label}
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
} 
