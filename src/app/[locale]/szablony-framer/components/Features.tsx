import { CheckCircle } from "lucide-react";
import { AnimatedElement } from "@/app/components/motion/animated-element";

interface FeaturesProps {
  locale: string;
}

export function Features({ locale }: FeaturesProps) {
  // Lokalne tłumaczenia nagłówków
  const t = {
    pl: {
      title: "Dlaczego nasze szablony Framer?",
      description: "Nasze szablony łączą piękny design z zaawansowaną funkcjonalnością, dając Ci przewagę konkurencyjną.",
      features: [
        {
          title: "Gotowe do użycia",
          description: "Wszystkie szablony są w pełni funkcjonalne i gotowe do wdrożenia w Twoim projekcie."
        },
        {
          title: "Profesjonalny design",
          description: "Każdy szablon jest projektowany przez doświadczonych designerów z dbałością o każdy detal."
        },
        {
          title: "Szybkie wdrożenie",
          description: "Dzięki gotowym szablonom możesz zaoszczędzić tygodnie pracy nad projektem."
        }
      ],
      benefits: [
        "Zaawansowane animacje i mikrointerakcje",
        "Komponenty wielokrotnego użytku",
        "Pixel-perfect design we wszystkich rozdzielczościach",
        "Zoptymalizowane pod kątem wydajności",
        "Łatwe dostosowywanie kolorów i typografii",
        "Dokumentacja i instrukcje implementacji",
        "Wsparcie techniczne i aktualizacje",
        "Zgodność z najnowszymi standardami Framer"
      ],
      whatYouGet: "Co otrzymujesz?"
    },
    en: {
      title: "Why choose our Framer templates?",
      description: "Our templates combine beautiful design with advanced functionality, giving you a competitive edge.",
      features: [
        {
          title: "Ready to use",
          description: "All templates are fully functional and ready to implement in your project."
        },
        {
          title: "Professional design",
          description: "Every template is designed by experienced designers with attention to detail."
        },
        {
          title: "Quick implementation",
          description: "With ready-made templates, you can save weeks of work on your project."
        }
      ],
      benefits: [
        "Advanced animations and micro-interactions",
        "Reusable components",
        "Pixel-perfect design in all resolutions",
        "Performance optimized",
        "Easy color and typography customization",
        "Documentation and implementation instructions",
        "Technical support and updates",
        "Compatibility with latest Framer standards"
      ],
      whatYouGet: "What do you get?"
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  return (
    <section id="features" className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-muted/20">
      <div className="absolute top-0 right-0 w-32 h-32 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <AnimatedElement direction="left" delay={0.1}>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-balance max-w-[800px] mx-auto mb-6 md:mb-8 text-foreground px-4 lg:px-0">
              {content.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 leading-relaxed px-4 lg:px-0">
              {content.description}
            </p>

            <div className="grid grid-cols-1 gap-6 md:gap-8 mb-8 md:mb-10 px-4 lg:px-0">
              {content.features.map((feature, index) => (
                <AnimatedElement
                  key={index}
                  direction="left"
                  delay={0.2 + index * 0.1}
                  className="group flex items-start space-x-4 md:space-x-6"
                >
                  <div className="relative">
                    <div className="h-8 w-8 md:h-12 md:w-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                      <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="absolute inset-0 h-8 w-8 md:h-12 md:w-12 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-xl mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>

          <AnimatedElement
            direction="right"
            delay={0.4}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-card/40 backdrop-blur-sm border border-border/30 rounded-3xl p-6 md:p-10 shadow-2xl">
              <h3 className="text-lg md:text-2xl font-bold mb-6 md:mb-8 text-foreground">
                {content.whatYouGet}
              </h3>
              <div className="space-y-3 md:space-y-5">
                {content.benefits.map((benefit, index) => (
                  <AnimatedElement
                    key={index}
                    direction="right"
                    delay={0.5 + index * 0.05}
                    className="flex items-start space-x-3 md:space-x-4 group"
                  >
                    <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-sm md:text-base">
                      {benefit}
                    </span>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
} 
