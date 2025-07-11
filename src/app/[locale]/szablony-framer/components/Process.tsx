'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatedElement } from "@/app/components/motion/animated-element";

interface ProcessProps {
  locale: string;
}

export default function Process({ locale }: ProcessProps) {
  const [activeStep, setActiveStep] = useState(0);
  const ticking = useRef(false);

  // Lokalne tłumaczenia nagłówków
  // const headerTranslations = {
  //   pl: {
  //     why: "JAK DZIAŁAMY",
  //     heading: "Proces tworzenia szablonów",
  //     subheading: "Od wyboru szablonu do gotowej strony w 5 prostych krokach - sprawdzony proces realizacji dostosowany do Twoich potrzeb"
  //   },
  //   en: {
  //     why: "HOW WE WORK",
  //     heading: "Template creation process",
  //     subheading: "From template selection to ready website in 5 simple steps - proven realization process tailored to your needs"
  //   }
  // };

  // const headerContent = headerTranslations[locale as keyof typeof headerTranslations] || headerTranslations.pl;

  const t = {
    pl: {
      badge: "JAK DZIAŁAMY",
      title: "Proces tworzenia szablonów",
      description: "Od koncepcji po gotowy szablon",
      steps: [
        {
          title: "Analiza i koncepcja",
          description: "Analizujemy Twoje potrzeby i tworzymy koncepcję szablonu dopasowaną do Twojej branży i celów biznesowych."
        },
        {
          title: "Projektowanie UI/UX",
          description: "Projektujemy nowoczesny interfejs z dbałością o user experience i najnowsze trendy w designie."
        },
        {
          title: "Implementacja w Framer",
          description: "Budujemy szablon w Framer z zaawansowanymi animacjami i interakcjami."
        },
        {
          title: "Testowanie i optymalizacja",
          description: "Testujemy szablon na różnych urządzeniach i optymalizujemy wydajność oraz responsywność."
        },
        {
          title: "Dokumentacja i przekazanie",
          description: "Tworzymy dokumentację i instrukcje implementacji, przekazujemy gotowy szablon."
        },
        {
          title: "Wsparcie i aktualizacje",
          description: "Zapewniamy wsparcie techniczne i aktualizacje zgodnie z najnowszymi standardami Framer."
        }
      ]
    },
    en: {
      badge: "HOW WE WORK",
      title: "Template creation process",
      description: "From concept to ready template",
      steps: [
        {
          title: "Analysis and concept",
          description: "We analyze your needs and create a template concept tailored to your industry and business goals."
        },
        {
          title: "UI/UX Design",
          description: "We design a modern interface with attention to user experience and latest design trends."
        },
        {
          title: "Framer Implementation",
          description: "We build the template in Framer with advanced animations and interactions."
        },
        {
          title: "Testing and optimization",
          description: "We test the template on various devices and optimize performance and responsiveness."
        },
        {
          title: "Documentation and handover",
          description: "We create documentation and implementation instructions, deliver the ready template."
        },
        {
          title: "Support and updates",
          description: "We provide technical support and updates according to the latest Framer standards."
        }
      ]
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const processSection = document.getElementById('process');
          if (!processSection) return;
          const rect = processSection.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(sectionHeight, windowHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const progress = visibleHeight / windowHeight;
          const stepIndex = Math.floor(progress * content.steps.length);
          setActiveStep(prev => prev !== Math.min(stepIndex, content.steps.length - 1) ? Math.min(stepIndex, content.steps.length - 1) : prev);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content.steps.length]);

  return (
    <section id="process" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-muted/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* <div className="text-center mb-20"> */}
        {/* <AnimatedElement
            className="flex flex-col gap-3"
            delay={0.1}
            viewport={{ once: true, margin: "-20% 0px" }}
          >
            <span className='font-bold uppercase text-primary'>
              {headerContent.why}
            </span>
            <h2 className='font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance max-w-[800px] mx-auto'>
              {headerContent.heading}
            </h2>
            <p className='text-lg text-muted-foreground text-balance max-w-[800px] mx-auto'>
              {headerContent.subheading}
            </p>
          </AnimatedElement> */}
        {/* </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Progress Timeline */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-4 top-0 w-0.5 h-full bg-muted-foreground/20"></div>
              <div
                className="absolute left-4 top-0 w-0.5 bg-linear-to-b from-primary to-primary/50 transition-all duration-300 ease-out"
                style={{ height: `${((activeStep + 1) / content.steps.length) * 100}%` }}
              ></div>

              {/* Step Indicators */}
              <div className="space-y-12">
                {content.steps.map((_, index) => (
                  <div key={index} className="relative flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${index <= activeStep
                        ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                        : 'bg-background border-muted-foreground/30'
                        }`}
                    >
                      {index <= activeStep && (
                        <div className="w-full h-full rounded-full bg-primary animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-16">
            {content.steps.map((step, index) => (
              <AnimatedElement
                key={index}
                delay={0.2 + index * 0.1}
                className={`transition-all duration-500 ${index <= activeStep ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4'
                  }`}
              >
                <div className="bg-card/40 backdrop-blur-xs border border-border/30 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
