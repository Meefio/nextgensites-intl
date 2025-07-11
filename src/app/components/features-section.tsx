"use client"

import { useEffect, useState } from "react"
import { Gauge, Palette, MonitorSmartphone, Code2, Search, Code } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"
import { AnimatedElement } from "@/app/components/motion/animated-element"
import { useTranslations, useLocale } from 'next-intl'
import Link from "next/link"

const Features = () => {
  const t = useTranslations('Features')
  const locale = useLocale()

  // Define the articles paths for each locale, following portfolio-section.tsx pattern
  const nextJsArticlePathEn = '/en/knowledge-base/why-nextjs-is-the-future-of-business-websites'
  const nextJsArticlePathPl = '/baza-wiedzy/dlaczego-nextjs-to-przyszlosc-stron-internetowych-dla-biznesu'

  // Set the path based on current locale
  const nextJsArticlePath = locale === 'en' ? nextJsArticlePathEn : nextJsArticlePathPl

  // Custom rendering for technology title with native Next.js Link
  const TechnologyTitle = () => {
    const parts = t.raw('technology.title').split('Next.js')
    return (
      <>
        {parts[0]}
        <Link
          href={nextJsArticlePath}
          className="font-bold text-accent hover:underline cursor-pointer"
        >
          Next.js
        </Link>
        {parts[1]}
      </>
    )
  }

  const features = [
    {
      icon: Gauge,
      title: t.raw('speed.title'),
      description: t.raw('speed.description')
    },
    {
      icon: Palette,
      title: t.raw('design.title'),
      description: t.raw('design.description')
    },
    {
      icon: MonitorSmartphone,
      title: t.raw('responsive.title'),
      description: t.raw('responsive.description')
    },
    {
      icon: Code2,
      titleComponent: <TechnologyTitle />,
      description: t.raw('technology.description'),
      hasCustomTitle: true
    },
    {
      icon: Search,
      title: t.raw('seo.title'),
      description: t.raw('seo.description')
    },
    {
      icon: Code,
      title: t.raw('multilingual.title'),
      description: t.raw('multilingual.description')
    }
  ]

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
      id='benefits'
      className="container flex flex-col items-center gap-6 pb-14 md:pb-14 sm:gap-7 scroll-mt-header"
    >
      <AnimatedElement
        className="flex flex-col gap-3"
        delay={0.2}
        viewport={{ once: true, margin: "-15% 0px" }}
      >
        <span className="font-bold uppercase text-primary text-center">
          {t('why')}
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          {t('heading')}
        </h2>
        <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">
          {t('subheading')}
        </p>
      </AnimatedElement>

      <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <AnimatedElement
              key={feature.hasCustomTitle ? 'technology' : feature.title}
              delay={calculateDelay(index, screenSize)}
              viewport={{ once: true, margin: "-20% 0px" }}
            >
              <Card className="group relative h-full overflow-hidden bg-linear-to-b from-background to-background/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[0.98] hover:border-primary/50">
                {/* Add gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardContent className="flex flex-col items-start gap-6 relative p-6">
                  <div className="inline-flex items-center justify-center rounded-xl bg-linear-to-br from-primary/10 to-primary/5 p-3 ring-1 ring-primary/10 transition-all duration-300 group-hover:from-primary/20 group-hover:to-primary/10 group-hover:ring-primary/20">
                    <Icon size={28} className="text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="space-y-2">
                    {feature.hasCustomTitle ? (
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {feature.titleComponent}
                      </h3>
                    ) : (
                      <h3
                        className="text-xl font-semibold tracking-tight text-foreground"
                        dangerouslySetInnerHTML={{ __html: feature.title }}
                      />
                    )}
                    <p
                      className="text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    />
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

export default Features
