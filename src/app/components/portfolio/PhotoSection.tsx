import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import Link from 'next/link'

export function PhotoSection() {
  const t = useTranslations('Portfolio-sections.UnderPressure')

  return (
    <div className="ovflow-scroll flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="relative flex flex-col flex-1 h-full gap-4">
            <div className="flex-1">
              <div className="sticky top-[40%]">

                <AnimatedElement>
                  <Card className="sticky top-0">
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
              </div>
            </div>
            <div className="relative flex-1">
              <div className="sticky top-[40%]">
                <AnimatedElement>
                  <Card className="sticky top-24">
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
            <div className="relative flex-1">
              <div className="sticky top-[40%]">
                <AnimatedElement>
                  <Card className="sticky top-[50%]">
                    <CardHeader>
                      <CardTitle>{t('features.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('features.description')}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="relative w-full">
            <Image
              src="/images/myciecisnieniem-min.png"
              alt="Under Pressure Website Preview"
              height={11826}
              width={1557}
              className="object-contain rounded-xl"
              quality={100}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <AnimatedElement>
          <Link
            href="https://myciecisnieniem.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Zobacz projekt live
          </Link>
        </AnimatedElement>
      </div>
    </div>
  )
}
