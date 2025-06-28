'use client';

import { useState } from "react";
import { ExternalLink, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { AnimatedElement } from "@/app/components/motion/animated-element";
import Image from "next/image";

interface PortfolioProps {
  locale: string;
}

export function Portfolio({ locale }: PortfolioProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Lokalne tłumaczenia nagłówków
  const headerTranslations = {
    pl: {
      why: "NASZE SZABLONY",
      heading: "Nasze szablony Framer",
      subheading: "Odkryj nasze najnowsze szablony i zobacz, jak mogą one pomóc w Twoim projekcie"
    },
    en: {
      why: "OUR TEMPLATES",
      heading: "Our Framer Templates",
      subheading: "Discover our latest templates and see how they can help with your project"
    }
  };

  const headerContent = headerTranslations[locale as keyof typeof headerTranslations] || headerTranslations.pl;

  const t = {
    pl: {
      title: "Nasze szablony Framer",
      description: "Odkryj nasze najnowsze szablony i zobacz, jak mogą one pomóc w Twoim projekcie",
      liveDemo: "Zobacz demo",
      selectTemplate: "Wybierz szablon",
      previousPage: "Poprzednie",
      nextPage: "Następne",
      projects: [
        {
          title: "Landio",
          description: "Szablon Landing Page SaaS | Profesjonalny, łatwy do personalizacji szablon zaprojektowany dla zwiększenia konwersji i zaangażowania użytkowników",
          image: "/images/framer/landio.webp",
          category: "Landing Page",
          demoUrl: "https://landio.framer.website/"
        },
        {
          title: "Nubien",
          description: "Szablon Landing Page AI Agency & Portfolio | Profesjonalny szablon idealny dla agencji kreatywnych, portfolios osobistych i prezentacji usług AI",
          image: "/images/framer/nubien.webp",
          category: "Landing Page",
          demoUrl: "https://nubien.framer.website/"
        },
        {
          title: "Dentoi",
          description: "Szablon Framer dla Klinik Dentystycznych | Nowoczesny, łatwy w personalizacji szablon zaprojektowany specjalnie dla dentystów i klinik stomatologicznych",
          image: "/images/framer/dentoi.webp",
          category: "Landing Page",
          demoUrl: "https://dentoi.framer.website/"
        },
        {
          title: "Altair",
          description: "Szablon Framer dla Agencji Design Subscription | Wysokokonwertujący szablon z przejrzystymi cenami i integracją rezerwacji spotkań dla usług designu.",
          image: "/images/framer/altair.webp",
          category: "Landing Page",
          demoUrl: "https://altair.framer.website/"
        },
        {
          title: "BookEase",
          description: "Szablon BookEase dla Rezerwacji Podróży | Responsywny i wszechstronny szablon zaprojektowany dla firm turystycznych z intuicyjnym systemem rezerwacji",
          image: "/images/framer/Bookease.webp",
          category: "Landing Page",
          demoUrl: "https://bookease.framer.website/"
        },
        {
          title: "Pawfect",
          description: "Szablon Pawfect dla Firm Pet Care | Profesjonalny i przyjazny szablon zaprojektowany dla salonów groomerskich, przedszkoli dla zwierząt i klinik weterynaryjnych",
          image: "/images/framer/pawfect.webp",
          category: "Landing Page",
          demoUrl: "https://pawfect.framer.media/"
        },
        {
          title: "Flowline",
          description: "Szablon Flowline dla SaaS i Startupów | Nowoczesny, wysokokonwertujący szablon z przejrzystym designem zaprojektowany do zwiększania rejestracji i sprzedaży.",
          image: "/images/framer/flowline.webp",
          category: "Landing Page",
          demoUrl: "https://flowline.framer.website/"
        },
        {
          title: "Ascension",
          description: "Szablon Ascension w Stylu Szwajcarskim | Minimalistyczny szablon Framer dla marek SaaS z ustrukturyzowanym designem prezentującym funkcje platformy",
          image: "/images/framer/ascension.webp",
          category: "Landing Page",
          demoUrl: "https://ascensiontemplate.framer.website/"
        },
        {
          title: "Hyperactive",
          description: "Szablon Hyperactive dla Agencji Kreatywnej | Profesjonalny i łatwy w personalizacji szablon zaprojektowany dla kreatywnych profesjonalistów z responsywnym designem",
          image: "/images/framer/hyperactive.webp",
          category: "Landing Page",
          demoUrl: "https://hyperactive.framer.website/"
        },
        {
          title: "Synthorixs",
          description: "Szablon Synthorix dla Dostawców Chemikaliów | Dedykowany szablon landing page z przejrzystym layoutem i zoptymalizowanymi CTA dla firm chemicznych",
          image: "/images/framer/synthorixs.webp",
          category: "Landing Page",
          demoUrl: "https://synthorix.framer.website/"
        },
        {
          title: "Civitas",
          description: "Szablon Landing Page dla Kancelarii Prawnych | Nowoczesny i godny zaufania szablon zaprojektowany dla kancelarii prawnych, adwokatów i doradców prawnych – idealny do prezentacji usług, przyciągania klientów i budowania wiarygodności",
          image: "/images/framer/civitas.webp",
          category: "Landing Page",
          demoUrl: "https://civitas.framer.website/"
        },
        {
          title: "Agencee",
          description: "Szablon Framer dla Agencji i Biznesów Cyfrowych | Nowoczesny, minimalistyczny i ciemny szablon idealny dla agencji kreatywnych, marketingowych, SEO, portfolio oraz stron osobistych. Łatwy do personalizacji i gotowy do prezentacji usług",
          image: "/images/framer/agencee.webp",
          category: "Landing Page",
          "demoUrl": "https://agencee.framer.website/"
        }
      ]
    },
    en: {
      title: "Our Framer Templates",
      description: "Discover our latest templates and see how they can help with your project",
      liveDemo: "View Demo",
      selectTemplate: "Select Template",
      previousPage: "Previous",
      nextPage: "Next",
      projects: [
        {
          title: "Landio",
          description: "SaaS Landing Page Template | Professional, easy-to-customize template designed to boost conversions and user engagement",
          image: "/images/framer/landio.webp",
          category: "Landing Page",
          demoUrl: "https://landio.framer.website/"
        },
        {
          title: "Nubien",
          description: "Landing Page Template AI Agency & Portfolio | Professional template designed for AI agencies, personal portfolios and AI service presentations",
          image: "/images/framer/nubien.webp",
          category: "Landing Page",
          demoUrl: "https://nubien.framer.website/"
        },
        {
          title: "Dentoi",
          description: "Dental Clinic Framer Template | Modern, easy-to-customize template designed specifically for dentists and dental clinics",
          image: "/images/framer/dentoi.webp",
          category: "Landing Page",
          demoUrl: "https://dentoi.framer.website/"
        },
        {
          title: "Altair",
          description: "Design Subscription Agency Framer Template | High-converting template with clear pricing tiers and seamless booking integration for design services.",
          image: "/images/framer/altair.webp",
          category: "Landing Page",
          demoUrl: "https://altair.framer.website/"
        },
        {
          title: "BookEase",
          description: "Travel Booking Website Template | Responsive and versatile template designed for travel companies with intuitive booking system",
          image: "/images/framer/Bookease.webp",
          category: "Landing Page",
          demoUrl: "https://bookease.framer.website/"
        },
        {
          title: "Pawfect",
          description: "Pet Care Company Framer Template | Professional and user-friendly template designed for pet grooming salons, pet daycare centers and veterinary clinics",
          image: "/images/framer/pawfect.webp",
          category: "Landing Page",
          demoUrl: "https://pawfect.framer.media//"
        },
        {
          title: "Flowline",
          description: "Flowline SaaS & Startup Template | Modern, high-converting template with clean design designed to boost signups and sales",
          image: "/images/framer/flowline.webp",
          category: "Landing Page",
          demoUrl: "https://flowline.framer.website/"
        },
        {
          title: "Ascension",
          description: "Swiss-style minimalist Framer template for SaaS brands with structured feature presentation",
          image: "/images/framer/ascension.webp",
          category: "Landing Page",
          demoUrl: "https://ascensiontemplate.framer.website/"
        },
        {
          title: "Hyperactive",
          description: "Hyper Active Design Membership Agency Template | Framer template designed for creative professionals with easy customization and responsive design",
          image: "/images/framer/hyperactive.webp",
          category: "Landing Page",
          demoUrl: "https://hyperactive.framer.website/"
        },
        {
          title: "Synthorixs",
          description: "Chemical Supplier Landing Page Template | Dedicated landing page template with clear layout and optimized CTA for chemical companies",
          image: "/images/framer/synthorixs.webp",
          category: "Landing Page",
          demoUrl: "https://synthorix.framer.website/"
        },
        {
          title: "Civitas",
          description: "Law Firm Landing Page Template | Modern and trustworthy template designed for law firms, lawyers and legal advisors – perfect for showcasing services, attracting clients and building trust",
          image: "/images/framer/civitas.webp",
          category: "Landing Page",
          demoUrl: "https://civitas.framer.website/"
        },
        {
          title: "Agencee",
          description: "Digital Agency & Business Framer Template | Modern, minimalist and dark template designed for creative agencies, marketing, SEO, portfolio and personal websites. Easy to customize and ready to showcase services",
          image: "/images/framer/agencee.webp",
          category: "Landing Page",
          demoUrl: "https://agencee.framer.website/"
        }
      ]
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  // Pagination logic
  const totalPages = Math.ceil(content.projects.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = content.projects.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section id="portfolio" className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 md:w-32 md:h-32 bg-primary/20 rounded-full blur-xl"></div>

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
          {currentProjects.map((project, index) => (
            <AnimatedElement
              key={index}
              delay={0.2 + index * 0.1}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={400}
                    className="w-full h-48 md:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-primary/90 text-primary-foreground px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <CardHeader className="relative z-10 p-4 md:p-6">
                  <CardTitle className="text-lg md:text-2xl mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 text-foreground">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 mt-auto p-4 md:p-6 pt-0">
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="w-full group/btn text-xs md:text-sm" asChild>
                      <a
                        href={project.demoUrl}
                        target={project.demoUrl !== "#" ? "_blank" : "_self"}
                        rel={project.demoUrl !== "#" ? "noopener noreferrer" : undefined}
                      >
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        {content.liveDemo}
                      </a>
                    </Button>
                    <Button variant="default" size="sm" className="w-full group/btn text-xs md:text-sm" asChild>
                      <a href="#contact">
                        <Globe className="h-3 w-3 md:h-4 md:w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        {content.selectTemplate}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <AnimatedElement className="flex flex-col items-center gap-4 mt-8 md:mt-12" delay={0.5}>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(index)}
                  className="w-8 h-8 md:w-10 md:h-10 text-xs md:text-sm"
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="gap-2 text-xs md:text-sm flex-1 sm:flex-none"
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                {content.previousPage}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="gap-2 text-xs md:text-sm flex-1 sm:flex-none"
              >
                {content.nextPage}
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
} 
