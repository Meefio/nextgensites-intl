import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Building2, MapPin, Globe } from 'lucide-react'

export default function UnderPressureProject() {
  const t = useTranslations('Portfolio-sections.UnderPressure')

  return (
    <div className="relative">
      <div className="relative h-[75vh] mb-8">
        <Image
          src="/images/portfolio-hero.jpg"
          alt="Under Pressure Hero"
          fill
          className="object-cover rounded-xl"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/25 rounded-xl" />
        <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-2xl">
            <AnimatedElement as='span' delay={0.1}>
              <p className="font-bold uppercase text-primary mb-4">
                REALIZACJE
              </p>
            </AnimatedElement>

            <AnimatedElement
              as='h1'
              delay={0.2}
              className='font-heading text-4xl font-semibold sm:text-5xl tracking-tight text-white mb-4'
            >
              {t('title')}
            </AnimatedElement>

            <AnimatedElement
              as='p'
              delay={0.3}
              className='text-lg text-white/90 mb-4'
            >
              Profesjonalna strona internetowa dla firmy zajmującej się myciem ciśnieniowym
            </AnimatedElement>

            <AnimatedElement
              as='p'
              delay={0.4}
              className='text-white/80 mb-8 max-w-md'
            >
              {t('shortDescription')}
            </AnimatedElement>

            <AnimatedElement delay={0.5}>
              <Link
                href="/kontakt"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t('cta')}
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <AnimatedElement delay={0.2}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t('clientInfo.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('clientInfo.company')}</p>
                    <p className="font-medium">Under Pressure</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('clientInfo.location')}</p>
                    <p className="font-medium">Warszawa, Polska</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('clientInfo.website')}</p>
                    <a
                      href="https://myciecisnieniem.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary transition-colors"
                    >
                      myciecisnieniem.pl
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t('projectDescription.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('projectDescription.content')}
                </p>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sticky Cards Section */}
          <div className="lg:col-span-4">
            <div className="h-full sticky top-24 space-y-8">
              <AnimatedElement delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('design.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('design.description')}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={0.5}>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('implementation.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('implementation.description')}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>

          {/* Full Website Image */}
          <div className="lg:col-span-8">

            <div className="relative w-full">
              <Image
                src="/images/myciecisnieniem-min.png"
                alt="Under Pressure Website Preview"
                height={11826}
                width={1557}
                className="object-contain rounded-t-xl"
                quality={100}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
} 
