import { Code, Palette, Zap, Smartphone, Layers, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { AnimatedElement } from "@/app/components/motion/animated-element";

interface ServicesProps {
  locale: string;
}

export function Services({ locale }: ServicesProps) {
  // Lokalne tłumaczenia nagłówków
  const headerTranslations = {
    pl: {
      why: "NASZE USŁUGI",
      heading: "Czym zajmujemy się w obszarze Framer",
      subheading: "Pełen zakres usług związanych z projektowaniem i implementacją szablonów"
    },
    en: {
      why: "OUR SERVICES",
      heading: "What we do in the Framer area",
      subheading: "Full range of services related to template design and implementation"
    }
  };

  const headerContent = headerTranslations[locale as keyof typeof headerTranslations] || headerTranslations.pl;
  const t = {
    pl: {
      title: "Nasze usługi",
      description: "Kompleksowe rozwiązania dla Twoich projektów Framer",
      framerDesign: {
        title: "Design w Framer",
        description: "Projektujemy nowoczesne interfejsy bezpośrednio w Framer z zaawansowanymi animacjami i interakcjami."
      },
      animations: {
        title: "Zaawansowane animacje",
        description: "Tworzymy płynne animacje i mikrointerakcje, które angażują użytkowników i poprawiają UX."
      },
      responsive: {
        title: "Responsywny design",
        description: "Wszystkie nasze szablony są w pełni responsywne i działają doskonale na każdym urządzeniu."
      },
      performance: {
        title: "Optymalizacja wydajności",
        description: "Dbamy o to, aby nasze szablony ładowały się błyskawicznie i działały płynnie."
      },
      components: {
        title: "Edycja treści",
        description: "Zmieniaj treści dzięki intuicyjnemu systemowi CMS"
      },
      support: {
        title: "Wsparcie techniczne",
        description: "Zapewniamy pełne wsparcie przy implementacji i dostosowywaniu szablonów."
      }
    },
    en: {
      title: "Our Services",
      description: "Comprehensive solutions for your Framer projects",
      framerDesign: {
        title: "Framer Design",
        description: "We design modern interfaces directly in Framer with advanced animations and interactions."
      },
      animations: {
        title: "Advanced Animations",
        description: "We create smooth animations and micro-interactions that engage users and improve UX."
      },
      responsive: {
        title: "Responsive Design",
        description: "All our templates are fully responsive and work perfectly on every device."
      },
      performance: {
        title: "Performance Optimization",
        description: "We ensure our templates load instantly and run smoothly."
      },
      components: {
        title: "Component Library",
        description: "We provide ready-to-use reusable components with configurable properties."
      },
      support: {
        title: "Technical Support",
        description: "We provide full support for template implementation and customization."
      }
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  const services = [
    {
      icon: Palette,
      title: content.framerDesign.title,
      description: content.framerDesign.description,
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Sparkles,
      title: content.animations.title,
      description: content.animations.description,
      gradient: "from-primary/15 to-primary/5"
    },
    {
      icon: Smartphone,
      title: content.responsive.title,
      description: content.responsive.description,
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: Zap,
      title: content.performance.title,
      description: content.performance.description,
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Layers,
      title: content.components.title,
      description: content.components.description,
      gradient: "from-primary/15 to-primary/5"
    },
    {
      icon: Code,
      title: content.support.title,
      description: content.support.description,
      gradient: "from-primary/10 to-primary/5"
    }
  ];

  return (
    <section id="services" className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <AnimatedElement
              key={index}
              delay={0.2 + index * 0.1}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <CardHeader className="relative z-10 p-4 md:p-6">
                  <div className="relative">
                    <div className="h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                      <service.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                    </div>
                    <div className="absolute inset-0 h-12 w-12 md:h-14 md:w-14 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardTitle className="text-lg md:text-2xl mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 p-4 md:p-6 pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
} 
