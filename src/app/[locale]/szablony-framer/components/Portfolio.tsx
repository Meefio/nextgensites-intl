import { ExternalLink,Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { AnimatedElement } from "@/app/components/motion/animated-element";

interface PortfolioProps {
  locale: string;
}

export function Portfolio({ locale }: PortfolioProps) {
  const t = {
    pl: {
      title: "Nasze szablony Framer",
      description: "Odkryj nasze najnowsze szablony i zobacz, jak mogą one pomóc w Twoim projekcie",
      liveDemo: "Zobacz demo",
      getTemplate: "Pobierz szablon",
      projects: [
        {
          title: "SaaS Landing Page",
          description: "Nowoczesna strona docelowa dla aplikacji SaaS z zaawansowanymi animacjami i sekcjami konwersji.",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
          technologies: ["Framer", "Animations", "Responsive", "CMS"],
          category: "Landing Page"
        },
        {
          title: "E-commerce Template",
          description: "Szablon sklepu internetowego z interaktywną galerią produktów i płynnym checkout.",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
          technologies: ["Framer", "E-commerce", "Cart", "Payments"],
          category: "E-commerce"
        },
        {
          title: "Portfolio Creative",
          description: "Kreatywny szablon portfolio z unikalnymi animacjami i interakcjami.",
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop",
          technologies: ["Framer", "Portfolio", "Creative", "Gallery"],
          category: "Portfolio"
        },
        {
          title: "Business Corporate",
          description: "Profesjonalny szablon korporacyjny z sekcjami usług i zespołu.",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
          technologies: ["Framer", "Corporate", "Services", "Team"],
          category: "Business"
        }
      ]
    },
    en: {
      title: "Our Framer Templates",
      description: "Discover our latest templates and see how they can help with your project",
      liveDemo: "View Demo",
      getTemplate: "Get Template",
      projects: [
        {
          title: "SaaS Landing Page",
          description: "Modern landing page for SaaS applications with advanced animations and conversion sections.",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
          technologies: ["Framer", "Animations", "Responsive", "CMS"],
          category: "Landing Page"
        },
        {
          title: "E-commerce Template",
          description: "Online store template with interactive product gallery and smooth checkout.",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
          technologies: ["Framer", "E-commerce", "Cart", "Payments"],
          category: "E-commerce"
        },
        {
          title: "Portfolio Creative",
          description: "Creative portfolio template with unique animations and interactions.",
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop",
          technologies: ["Framer", "Portfolio", "Creative", "Gallery"],
          category: "Portfolio"
        },
        {
          title: "Business Corporate",
          description: "Professional corporate template with services and team sections.",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
          technologies: ["Framer", "Corporate", "Services", "Team"],
          category: "Business"
        }
      ]
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <AnimatedElement className="text-center mb-20" delay={0.1}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            {content.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.description}
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.projects.map((project, index) => (
            <AnimatedElement
              key={index}
              delay={0.2 + index * 0.1}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
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
      </div>
    </section>
  );
} 
