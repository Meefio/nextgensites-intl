import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/app/components/ui/card'
import Link from 'next/link'

export function PhotoSection() {
  const t = useTranslations('Portfolio-sections.UnderPressure')

  return (
    <div className="container ovflow-scroll flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="relative flex flex-col flex-1 h-full gap-4">
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
                    <CardFooter>
                      <Link
                        href="https://myciecisnieniem.pl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {t('viewLive')}
                      </Link>
                    </CardFooter>
                  </Card>
                </AnimatedElement>
              </div>
            </div>
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
                    <CardFooter>
                      <Link
                        href="https://myciecisnieniem.pl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {t('viewLive')}
                      </Link>
                    </CardFooter>
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
                    <CardFooter>
                      <Link
                        href="https://myciecisnieniem.pl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {t('viewLive')}
                      </Link>
                    </CardFooter>
                  </Card>
                </AnimatedElement>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="relative w-full">
            <Image
              src="/images/myciecisnieniem-full-size.webp"
              alt="Under Pressure Website Preview"
              height={12886}
              width={1327}
              className="object-contain object-top rounded-xl"
              quality={100}
            />
          </div>
        </div>
      </div>
      <div className="ovflow-scroll flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="relative flex flex-col flex-1 h-full gap-4">
              <div className="flex-1">
                <div className="sticky top-[40%]">

                  <AnimatedElement>
                    <Card className="sticky top-0">
                      <CardHeader>
                        <CardTitle>{t('Google-position-1.title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('Google-position-1.description')}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href="https://myciecisnieniem.pl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          {t('viewLive')}
                        </Link>
                      </CardFooter>
                    </Card>
                  </AnimatedElement>
                </div>
              </div>

            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="relative w-full">
              <Image
                src="/images/rank1-min.jpg"
                alt="Google Rank photo"
                height={1690}
                width={1146}
                className="object-contain rounded-xl"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ovflow-scroll flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="relative flex flex-col flex-1 h-full gap-4">
              <div className="flex-1">
                <div className="sticky top-[40%]">

                  <AnimatedElement>
                    <Card className="sticky top-0">
                      <CardHeader>
                        <CardTitle>{t('Google-position-2.title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('Google-position-2.description')}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href="https://myciecisnieniem.pl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          {t('viewLive')}
                        </Link>
                      </CardFooter>
                    </Card>
                  </AnimatedElement>
                </div>
              </div>

            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="relative w-full">
              <Image
                src="/images/rank-2-min.jpg"
                alt="Google Rank photo"
                height={1838}
                width={1158}
                className="object-contain rounded-xl"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
