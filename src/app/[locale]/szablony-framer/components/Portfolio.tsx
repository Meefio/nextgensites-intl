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
  const itemsPerPage = 4;

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
      getTemplate: "Pobierz szablon",
      previousPage: "Poprzednie",
      nextPage: "Następne",
      projects: [
        {
          title: "SaaS Landing Page",
          description: "Nowoczesna strona docelowa dla aplikacji SaaS z zaawansowanymi animacjami i sekcjami konwersji.",
          image: "/images/portfolio/saas-landing-page.jpg",
          technologies: ["Framer", "Animations", "Responsive", "CMS"],
          category: "Landing Page"
        },
        {
          title: "E-commerce Template",
          description: "Szablon sklepu internetowego z interaktywną galerią produktów i płynnym checkout.",
          image: "/images/portfolio/e-commerce-template.jpg",
          technologies: ["Framer", "E-commerce", "Cart", "Payments"],
          category: "E-commerce"
        },
        {
          title: "Portfolio Creative",
          description: "Kreatywny szablon portfolio z unikalnymi animacjami i interakcjami.",
          image: "/images/portfolio/portfolio-creative.jpg",
          technologies: ["Framer", "Portfolio", "Creative", "Gallery"],
          category: "Portfolio"
        },
        {
          title: "Business Corporate",
          description: "Profesjonalny szablon korporacyjny z sekcjami usług i zespołu.",
          image: "/images/portfolio/business-corporate.jpg",
          technologies: ["Framer", "Corporate", "Services", "Team"],
          category: "Business"
        },
        {
          title: "Restaurant Template",
          description: "Elegancki szablon dla restauracji z galerią dań i systemem rezerwacji.",
          image: "/images/portfolio/restaurant-template.jpg",
          technologies: ["Framer", "Restaurant", "Booking", "Gallery"],
          category: "Restaurant"
        },
        {
          title: "Fashion Brand",
          description: "Stylowy szablon dla marki modowej z dynamiczną prezentacją produktów.",
          image: "/images/portfolio/fashion-brand.jpg",
          technologies: ["Framer", "Fashion", "Lookbook", "Shopping"],
          category: "Fashion"
        },
        {
          title: "Tech Startup",
          description: "Nowoczesny szablon dla startupów technologicznych z sekcjami inwestorów.",
          image: "/images/portfolio/tech-startup.jpg",
          technologies: ["Framer", "Startup", "Investors", "Analytics"],
          category: "Startup"
        },
        {
          title: "Health & Wellness",
          description: "Szablon dla branży zdrowotnej z systemem umówień wizyt.",
          image: "/images/portfolio/health-wellness.jpg",
          technologies: ["Framer", "Health", "Appointments", "Services"],
          category: "Health"
        }
      ]
    },
    en: {
      title: "Our Framer Templates",
      description: "Discover our latest templates and see how they can help with your project",
      liveDemo: "View Demo",
      getTemplate: "Get Template",
      previousPage: "Previous",
      nextPage: "Next",
      projects: [
        {
          title: "SaaS Landing Page",
          description: "Modern landing page for SaaS applications with advanced animations and conversion sections.",
          image: "/images/portfolio/saas-landing-page.jpg",
          technologies: ["Framer", "Animations", "Responsive", "CMS"],
          category: "Landing Page"
        },
        {
          title: "E-commerce Template",
          description: "Online store template with interactive product gallery and smooth checkout.",
          image: "/images/portfolio/e-commerce-template.jpg",
          technologies: ["Framer", "E-commerce", "Cart", "Payments"],
          category: "E-commerce"
        },
        {
          title: "Portfolio Creative",
          description: "Creative portfolio template with unique animations and interactions.",
          image: "/images/portfolio/portfolio-creative.jpg",
          technologies: ["Framer", "Portfolio", "Creative", "Gallery"],
          category: "Portfolio"
        },
        {
          title: "Business Corporate",
          description: "Professional corporate template with services and team sections.",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
          technologies: ["Framer", "Corporate", "Services", "Team"],
          category: "Business"
        },
        {
          title: "Restaurant Template",
          description: "Elegant restaurant template with dish gallery and reservation system.",
          image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=300&fit=crop",
          technologies: ["Framer", "Restaurant", "Booking", "Gallery"],
          category: "Restaurant"
        },
        {
          title: "Fashion Brand",
          description: "Stylish template for fashion brands with dynamic product presentation.",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
          technologies: ["Framer", "Fashion", "Lookbook", "Shopping"],
          category: "Fashion"
        },
        {
          title: "Tech Startup",
          description: "Modern template for tech startups with investor sections.",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
          technologies: ["Framer", "Startup", "Investors", "Analytics"],
          category: "Startup"
        },
        {
          title: "Health & Wellness",
          description: "Template for healthcare industry with appointment booking system.",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
          technologies: ["Framer", "Health", "Appointments", "Services"],
          category: "Health"
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
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentProjects.map((project, index) => (
            <AnimatedElement
              key={index}
              delay={0.2 + index * 0.1}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors duration-300 text-foreground">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="flex-1 group/btn">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      {content.liveDemo}
                    </Button>
                    <Button variant="default" size="sm" className="flex-1 group/btn">
                      <Globe className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      {content.getTemplate}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <AnimatedElement className="flex justify-center items-center gap-4 mt-12" delay={0.5}>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {content.previousPage}
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(index)}
                  className="w-10 h-10"
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="gap-2"
            >
              {content.nextPage}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
} 
