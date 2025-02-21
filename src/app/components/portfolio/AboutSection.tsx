import { useTranslations } from 'next-intl'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Building2, MapPin, Globe } from 'lucide-react'

export function AboutSection() {
  const t = useTranslations('Portfolio-sections.UnderPressure')

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
  )
}
