import { Star } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { AnimatedElement } from "@/app/components/motion/animated-element";
import Image from "next/image";

interface TestimonialsProps {
  locale: string;
}

export default function Testimonials({ locale }: TestimonialsProps) {
  // Lokalne tłumaczenia nagłówków
  const headerTranslations = {
    pl: {
      why: "OPINIE KLIENTÓW",
      heading: "Co mówią nasi klienci",
      subheading: "Poznaj opinie klientów, którzy już skorzystali z naszych szablonów Framer"
    },
    en: {
      why: "CLIENT REVIEWS",
      heading: "What our clients say",
      subheading: "Read testimonials from clients who have already used our Framer templates"
    }
  };

  const headerContent = headerTranslations[locale as keyof typeof headerTranslations] || headerTranslations.pl;

  const t = {
    pl: {
      title: "Co mówią nasi klienci",
      description: "Poznaj opinie klientów, którzy już skorzystali z naszych szablonów Framer",
      testimonials: [
        {
          name: "Anna Kowalska",
          position: "CEO, TechStart",
          content: "Szablon SaaS Landing Page przekroczył nasze oczekiwania. Animacje są płynne, design nowoczesny, a konwersja wzrosła o 40%.",
          rating: 5,
          image: "/images/testimonials/anna-kowalska.jpg"
        },
        {
          name: "Michał Nowak",
          position: "Founder, Creative Studio",
          content: "Portfolio template był dokładnie tym, czego szukałem. Łatwy w dostosowaniu, responsywny i z przełącznymi animacjami.",
          rating: 5,
          image: "/images/testimonials/michal-nowak.jpg"
        },
        {
          name: "Katarzyna Wiśniewska",
          position: "Marketing Manager, E-shop Pro",
          content: "Szablon e-commerce zaoszczędził nam miesiące pracy. Wszystko działa perfekcyjnie na każdym urządzeniu.",
          rating: 5,
          image: "/images/testimonials/katarzyna-wisniewska.jpg"
        },
        {
          name: "Piotr Zieliński",
          position: "CTO, FinanceApp",
          content: "Profesjonalne podejście i doskonała jakość. Szablon był gotowy do wdrożenia od razu po otrzymaniu.",
          rating: 5,
          image: "/images/testimonials/piotr-zielinski.jpg"
        }
      ]
    },
    en: {
      title: "What our clients say",
      description: "Read testimonials from clients who have already used our Framer templates",
      testimonials: [
        {
          name: "Anna Smith",
          position: "CEO, TechStart",
          content: "The SaaS Landing Page template exceeded our expectations. Animations are smooth, design is modern, and conversion increased by 40%.",
          rating: 5,
          image: "/images/testimonials/anna-kowalska.jpg"
        },
        {
          name: "Michael Johnson",
          position: "Founder, Creative Studio",
          content: "Portfolio template was exactly what I was looking for. Easy to customize, responsive and with stunning animations.",
          rating: 5,
          image: "/images/testimonials/anna-kowalska.jpg"
        },
        {
          name: "Kate Wilson",
          position: "Marketing Manager, E-shop Pro",
          content: "E-commerce template saved us months of work. Everything works perfectly on every device.",
          rating: 5,
          image: "/images/testimonials/anna-kowalska.jpg"
        },
        {
          name: "Peter Brown",
          position: "CTO, FinanceApp",
          content: "Professional approach and excellent quality. Template was ready for implementation right after receiving.",
          rating: 5,
          image: "/images/testimonials/anna-kowalska.jpg"
        }
      ]
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

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
          {content.testimonials.map((testimonial, index) => (
            <AnimatedElement
              key={index}
              delay={0.2 + index * 0.1}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden h-full">
                <CardContent className="p-8">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={24}
                      height={24}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position}
                      </p>
                    </div>
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
