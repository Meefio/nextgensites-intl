'use client';

import { Timeline } from "@/app/components/ui/timeline";
import { AnimatedElement } from "@/app/components/motion/animated-element";

interface ProcessTimelineProps {
  locale: string;
}

export default function ProcessTimeline({ locale }: ProcessTimelineProps) {
  // Lokalne tłumaczenia nagłówków
  const headerTranslations = {
    pl: {
      why: "JAK DZIAŁAMY",
      heading: "Proces tworzenia szablonów",
      subheading: "Od wyboru szablonu do gotowej strony w 5 prostych krokach - sprawdzony proces realizacji dostosowany do Twoich potrzeb"
    },
    en: {
      why: "HOW WE WORK",
      heading: "Template creation process",
      subheading: "From template selection to ready website in 5 simple steps - proven realization process tailored to your needs"
    }
  };

  const headerContent = headerTranslations[locale as keyof typeof headerTranslations] || headerTranslations.pl;

  const t = {
    pl: {
      badge: "JAK DZIAŁAMY",
      title: "Proces tworzenia szablonów",
      description: "Od wyboru szablonu do gotowej strony w 5 prostych krokach - sprawdzony proces realizacji dostosowany do Twoich potrzeb",
      steps: [
        {
          title: "Wybór i konsultacja",
          content: "Przeglądasz nasze szablony i wybierasz ten, który najlepiej pasuje do Twojego biznesu. Omawiamy Twoje potrzeby i planujemy personalizację. Możliwość połączenia kilku szablonów w jeden unikalny projekt."
        },
        {
          title: "Wycena i harmonogram",
          content: "Przygotowujemy ofertę dostosowaną do zakresu zmian i ustalamy harmonogram realizacji – od 3 do 14 dni roboczych. Wyceniamy dodatkowe funkcjonalności i możliwość łączenia szablonów."
        },
        {
          title: "Personalizacja treści",
          content: "Zmieniamy teksty, zdjęcia, kolory i logo zgodnie z Twoją marką. Dostosowujemy szablon do Twojej branży i stylu komunikacji. Implementujemy elementy z różnych szablonów według Twoich indywidualnych potrzeb."
        },
        {
          title: "Dostosowanie funkcji",
          content: "Dodajemy lub modyfikujemy sekcje według Twoich potrzeb biznesowych. Konfigurujemy formularz kontaktowy, integracje i dodatkowe funkcjonalności. Łączymy najlepsze elementy z różnych szablonów."
        },
        {
          title: "Optymalizacja i testy",
          content: "Sprawdzamy responsywność, szybkość ładowania i kompatybilność na wszystkich urządzeniach. Testujemy wszystkie funkcje, animacje i połączone elementy szablonów."
        },
        {
          title: "Publikacja i przekazanie",
          content: "Uruchamiamy stronę, przekazujemy pliki źródłowe i instrukcje obsługi. Szkolimy Cię z edycji treści w intuicyjnym panelu Framer i pokazujemy jak zarządzać wszystkimi funkcjonalnościami."
        }
      ]
    },
    en: {
      badge: "HOW WE WORK",
      title: "Template creation process",
      description: "From template selection to ready website in 5 simple steps - proven realization process tailored to your needs",
      steps: [
        {
          title: "Selection and consultation",
          content: "Browse our templates and choose the one that best fits your business. We discuss your needs and plan personalization. Option to combine multiple templates into one unique project."
        },
        {
          title: "Quote and timeline",
          content: "We prepare a quote tailored to the scope of changes and set a realization timeline – from 3 to 14 working days. We price additional functionalities and template combination possibilities."
        },
        {
          title: "Content personalization",
          content: "We change texts, images, colors and logo according to your brand. We adapt the template to your industry and communication style. We implement elements from different templates according to your individual needs."
        },
        {
          title: "Function customization",
          content: "We add or modify sections according to your business needs. We configure contact forms, integrations and additional functionalities. We combine the best elements from different templates."
        },
        {
          title: "Optimization and testing",
          content: "We check responsiveness, loading speed and compatibility on all devices. We test all functions, animations and combined template elements."
        },
        {
          title: "Publication and handover",
          content: "We launch the website, provide source files and usage instructions. We train you on content editing in the intuitive Framer panel and show how to manage all functionalities."
        }
      ]
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  // Convert steps to timeline format
  const timelineData = content.steps.map(step => ({
    title: step.title,
    content: (
      <div className="text-muted-foreground leading-relaxed">
        <p>{step.content}</p>
      </div>
    )
  }));

  return (
    <section id="process" className="relative pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

      {/* <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <AnimatedElement
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
          </AnimatedElement>
        </div> */}

        {/* Timeline Component */}
        <Timeline data={timelineData} />
      {/* </div> */}
    </section>
  );
} 
