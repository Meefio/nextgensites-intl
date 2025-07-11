import { Users, Award, Target } from "lucide-react";
import { AnimatedElement } from "@/app/components/motion/animated-element";
import { AnimatedCounter } from "@/app/components/ui/animated-counter";

interface AboutProps {
  locale: string;
}

export function About({ locale }: AboutProps) {
  // Lokalne tłumaczenia nagłówków
  const headerTranslations = {
    pl: {
      why: "DLACZEGO MY",
      heading: "Dlaczego wybrać nas?",
      subheading: "Jesteśmy zespołem ekspertów z wieloletnim doświadczeniem w projektowaniu i tworzeniu zaawansowanych szablonów Framer"
    },
    en: {
      why: "WHY US",
      heading: "Why choose us?",
      subheading: "We are a team of experts with years of experience in designing and creating advanced Framer templates"
    }
  };

  const headerContent = headerTranslations[locale as keyof typeof headerTranslations] || headerTranslations.pl;

  const t = {
    pl: {
      title: "Dlaczego wybrać nas?",
      description: "Jesteśmy zespołem ekspertów z wieloletnim doświadczeniem w projektowaniu i tworzeniu zaawansowanych szablonów Framer.",
      stats: [
        { number: 3, suffix: "+", label: "Lat doświadczenia" },
        { number: 50, suffix: "+", label: "Ukończonych projektów" },
        { number: 30, suffix: "+", label: "Zadowolonych klientów" },
        { number: 99, suffix: "%", label: "Satysfakcji klientów" }
      ],
      values: [
        {
          title: "Doświadczony zespół",
          description: "Nasz zespół składa się z doświadczonych designerów i deweloperów specjalizujących się w Framer.",
        },
        {
          title: "Jakość na pierwszym miejscu",
          description: "Każdy szablon przechodzi rygorystyczne testy jakości i optymalizacji przed przekazaniem.",
        },
        {
          title: "Orientacja na rezultaty",
          description: "Projektujemy szablony z myślą o konwersji i celach biznesowych naszych klientów.",
        }
      ]
    },
    en: {
      title: "Why choose us?",
      description: "We are a team of experts with years of experience in designing and creating advanced Framer templates.",
      stats: [
        { number: 3, suffix: "+", label: "Years of experience" },
        { number: 50, suffix: "+", label: "Completed projects" },
        { number: 30, suffix: "+", label: "Happy clients" },
        { number: 99, suffix: "%", label: "Client satisfaction" }
      ],
      values: [
        {
          title: "Experienced team",
          description: "Our team consists of experienced designers and developers specializing in Framer.",
        },
        {
          title: "Quality first",
          description: "Every template undergoes rigorous quality testing and optimization before delivery.",
        },
        {
          title: "Results-oriented",
          description: "We design templates with conversion and business goals of our clients in mind.",
        }
      ]
    }
  };

  const content = t[locale as keyof typeof t] || t.pl;

  const values = [
    {
      icon: Users,
      title: content.values[0].title,
      description: content.values[0].description,
      gradient: "from-blue-500/10 to-indigo-500/10"
    },
    {
      icon: Award,
      title: content.values[1].title,
      description: content.values[1].description,
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Target,
      title: content.values[2].title,
      description: content.values[2].description,
      gradient: "from-green-500/10 to-emerald-500/10"
    }
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-muted/30">
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
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

        <AnimatedElement
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          delay={0.2}
        >
          {content.stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter
                    endValue={stat.number}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
              </div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <AnimatedElement
              key={index}
              delay={0.3 + index * 0.1}
              className="group text-center p-6 relative"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${value.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="relative mx-auto mb-4">
                  <div className="h-16 w-16 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute inset-0 h-16 w-16 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
} 
