"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { AnimatedElement } from "@/app/components/motion/animated-element"
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Copy, Hourglass, Gauge, ShieldAlert, DollarSign } from "lucide-react"

const WhyNotWordPress = () => {
  const t = useTranslations('WhyNotWordPress')
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const wordpressCards = [
    {
      icon: Copy,
      title: t.raw('card1.title'),
      description: t.raw('card1.description')
    },
    {
      icon: Hourglass,
      title: t.raw('card2.title'),
      description: t.raw('card2.description')
    },
    {
      icon: Gauge,
      title: t.raw('card3.title'),
      description: t.raw('card3.description')
    },
    {
      icon: ShieldAlert,
      title: t.raw('card4.title'),
      description: t.raw('card4.description')
    },
    {
      icon: DollarSign,
      title: t.raw('card5.title'),
      description: t.raw('card5.description')
    }
  ]

  return (
    <section
      id='why-not-wordpress'
      ref={sectionRef}
      className="container flex flex-col gap-10 relative bg-background pb-20"
    >

      <AnimatedElement
        className="sticky top-0 md:top-5 pt-24 md:pt-20 pb-4 bg-background flex flex-col gap-3 text-center z-10"
        delay={0.2}
        viewport={{ once: true, margin: "-15% 0px" }}
      >
        <span className="font-bold uppercase text-primary">
          {t('tagline')}
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance mx-auto">
          {t('heading')}
        </h2>
        <p className="text-lg text-muted-foreground text-balance max-w-xl mx-auto">
          {t('subheading')}
        </p>
      </AnimatedElement>

      {/* Zwiększony odstęp, aby headingi nie nakładały się na karty */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Karty */}
        <div className="lg:w-1/2 flex flex-col ">
          <div className="space-y-64 lg:space-y-80 ">
            {wordpressCards.map((card, index) => {
              const Icon = card.icon;

              // Zwiększony odstęp od góry dla każdej kolejnej karty
              const topOffset = isMobile ? 300 + (index * 70) : 300 + (index * 80);

              return (
                <div
                  key={index}
                  className="relative card-sticky"
                  style={{
                    position: "sticky",
                    top: `${topOffset}px`, // Znacznie większy odstęp od góry
                    zIndex: index + 1, // Ostatnia karta ma najwyższy z-index
                    marginBottom: "100px", // Znacznie większy odstęp między kartami
                  }}
                >
                  <Card className=" shadow-inner transition-shadow duration-300 border-border overflow-hidden bg-card">
                    <CardContent className="p-4 md:p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2 shrink-0">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <h3
                          className="text-base md:text-lg font-semibold text-foreground"
                          dangerouslySetInnerHTML={{ __html: card.title }}
                        />
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: card.description }}
                      />
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cytat */}
        <div className="lg:w-1/2 flex items-center justify-center lg:sticky lg:top-80 self-start z-30 md:z-0">
          <AnimatedElement
            className="relative px-6 py-12 max-w-lg bg-background rounded-lg"
            delay={0.2}
            direction="up"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <motion.span
              className="font-quote md:text-[120px] text-[80px] absolute md:-top-28 -top-16 left-0 text-primary rotate-180"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              &ldquo;
            </motion.span>

            <AnimatedElement
              as="p"
              delay={0.5}
              className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground text-balance relative z-10 mb-6 pl-4"
            >
              {t('quote')}
            </AnimatedElement>

            <motion.span
              className="font-quote md:text-[120px] text-[80px] absolute md:-bottom-28 -bottom-16 right-4 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              &rdquo;
            </motion.span>

            <div className="mt-6">
              <AnimatedElement
                as="p"
                delay={0.7}
                direction="right"
                className="font-bold text-right text-[14px]"
              >
                {t('author')}
              </AnimatedElement>

              <AnimatedElement
                as="p"
                delay={0.8}
                direction="right"
                className="text-xs text-right text-muted-foreground"
              >
                {t('position')}
              </AnimatedElement>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}

export default WhyNotWordPress 
