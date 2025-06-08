'use client';

import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AnimatedElement } from "@/app/components/motion/animated-element";

interface HeroProps {
  locale: string;
}

export function Hero({ locale }: HeroProps) {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const t = {
    pl: {
      badge: "Najlepsze szablony Framer",
      title: "Szablony Framer",
      subtitle: "z animacjami Premium",
      description: "Przyciągnij uwagę klientów dzięki zaawansowanym animacjom i interakcjom. Nasze szablony Framer łączą nowoczesny design z płynną funkcjonalnością.",
      startProject: "Zamów szablon",
      seeWork: "Zobacz szablony",
      performanceScore: "Wynik wydajności",
      loadTime: "Czas ładowania",
      happyClients: "Zadowolonych klientów"
    },
    en: {
      badge: "Best Framer Templates",
      title: "Framer Templates",
      subtitle: "with Premium animations",
      description: "Attract customer attention with advanced animations and interactions. Our Framer templates combine modern design with smooth functionality.",
      startProject: "Order Template",
      seeWork: "View Templates",
      performanceScore: "Performance Score",
      loadTime: "Load Time",
      happyClients: "Happy Clients"
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto text-center max-w-6xl relative z-10 pt-[80px] pb-[40px]">
        <AnimatedElement
          className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary px-6 py-3 rounded-full mb-8"
          delay={0.1}
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">{content.badge}</span>
        </AnimatedElement>

        <AnimatedElement
          as="h1"
          className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          delay={0.2}
        >
          <span className="text-foreground">
            {content.title}
          </span>
          <br />
          <span className="text-foreground">
            {content.subtitle}
          </span>
        </AnimatedElement>

        <AnimatedElement
          as="p"
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
          delay={0.3}
        >
          {content.description}
        </AnimatedElement>

        <AnimatedElement
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          delay={0.4}
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg group rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {content.startProject}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({
              behavior: 'smooth'
            })}
            className="px-8 py-4 text-lg border-border bg-background/50 backdrop-blur-sm hover:bg-muted/30 transition-all duration-300 rounded-full"
          >
            <Rocket className="mr-2 h-5 w-5" />
            {content.seeWork}
          </Button>
        </AnimatedElement>

        {/* Trusted by section */}
        <AnimatedElement delay={0.5}>
          <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {['Framer', 'Figma', 'Adobe', 'Webflow'].map((company, index) => (
              <AnimatedElement
                key={company}
                className="text-lg font-semibold text-muted-foreground"
                delay={0.6 + index * 0.1}
              >
                {company}
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-20"
          delay={0.6}
        >
          {[
            {
              value: "99%",
              label: content.performanceScore
            },
            {
              value: "&lt; 1s",
              label: content.loadTime
            },
            {
              value: "50+",
              label: content.happyClients
            }
          ].map((stat, index) => (
            <AnimatedElement
              key={index}
              className="relative group"
              delay={0.7 + index * 0.1}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div
                  className="text-4xl font-bold text-primary mb-2"
                  dangerouslySetInnerHTML={{ __html: stat.value }}
                />
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </div>
    </section>
  );
} 
