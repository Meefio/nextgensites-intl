"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { Gauge, BarChart2, MonitorSmartphone, CreditCard, Headphones, Layers } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"
import { AnimatedElement } from "@/app/components/motion/animated-element"

const features = [
  {
    icon: Gauge,
    title: "Błyskawiczna wydajność",
    description: "Dzięki Next.js Twoja strona ładuje się błyskawicznie, co przekłada się na lepsze doświadczenia użytkowników i wyższą konwersję. Szybkość działania to także kluczowy czynnik rankingowy w Google."
  },
  {
    icon: BarChart2,
    title: "Zaawansowane SEO",
    description: "Twoja strona będzie zoptymalizowana do osiągania lepszych wyników w Google, co zwiększy widoczność Twojego biznesu."
  },
  {
    icon: MonitorSmartphone,
    title: "Responsywność i nowoczesność",
    description: "Strony idealnie dostosowują się do urządzeń mobilnych i komputerów, co zapewnia płynne korzystanie na każdym urządzeniu."
  },
  {
    icon: CreditCard,
    title: "Oszczędność kosztów i elastyczny model płatności",
    description: "Elastyczna płatność umożliwia korzystanie ze strony bez dużych wydatków początkowych."
  },
  {
    icon: Headphones,
    title: "Wsparcie techniczne po uruchomieniu strony",
    description: "Zapewniamy wsparcie techniczne po uruchomieniu strony, by wszystko działało bez zarzutu"
  },
  {
    icon: Layers,
    title: "Elastyczność i możliwość rozbudowy",
    description: "Nasze strony są elastyczne i łatwe do rozbudowy w miarę rozwoju Twojego biznesu."
  }
]

export function Features() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setScreenSize('desktop')
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        setScreenSize('tablet')
      } else {
        setScreenSize('mobile')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const calculateDelay = (index: number, currentScreenSize: 'mobile' | 'tablet' | 'desktop') => {
    if (currentScreenSize === 'mobile') return 0

    switch (currentScreenSize) {
      case 'desktop':
        return (index % 3) * 0.15 + Math.floor(index / 3) * 0.3
      case 'tablet':
        return (index % 2) * 0.15 + Math.floor(index / 2) * 0.3
      default:
        return 0
    }
  }

  return (
    <section
      id="korzysci"
      className="container flex flex-col items-center gap-6 py-14 md:pb-14 sm:gap-7 scroll-mt-header"
    >
      <AnimatedElement
        className="flex flex-col gap-3"
        delay={0.2}
        viewport={{ once: true, margin: "-20% 0px" }}
      >
        <span className="font-bold uppercase text-primary text-center">
          Dlaczego nextgen sites?
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Nowoczesność, która się opłaca
        </h2>
        <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">
          Nowoczesna technologia, lepsze wyniki – przyciągnij klientów i wyprzedź konkurencję!
        </p>
      </AnimatedElement>

      <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <AnimatedElement
              key={feature.title}
              delay={calculateDelay(index, screenSize)}
              viewport={{ once: true, margin: "-20% 0px" }}
            >
              <Card className="shadow-lg relative h-full">
                <CardContent className="flex flex-col items-start gap-5 relative p-6">
                  <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          )
        })}
      </div>
    </section>
  )
}
