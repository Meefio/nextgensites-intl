import { useTranslations } from 'next-intl'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card'
import { Building2, MapPin, Globe } from 'lucide-react'

// Konfiguracja projektów
const projectConfig = {
  underpressure: {
    companyName: 'Under Pressure',
    location: 'Warszawa, Polska',
    website: 'myciecisnieniem.pl',
    websiteUrl: 'https://myciecisnieniem.pl',
    translationNamespace: 'UnderPressure'
  },
  buildwise: {
    companyName: 'BuildWise',
    location: 'Warszawa, Polska',
    website: 'buildwise.pl', // Przykładowa domena
    websiteUrl: '#', // Tymczasowo pusty link
    translationNamespace: 'BuildWise'
  }
}

interface AboutSectionProps {
  projectKey: 'underpressure' | 'buildwise'
}

export function AboutSection({ projectKey }: AboutSectionProps) {
  const config = projectConfig[projectKey] || projectConfig.underpressure

  // Używamy dokładnej nazwy klucza zamiast dynamicznego tworzenia
  const t = useTranslations(`Portfolio-sections.${config.translationNamespace}`)

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
                <p className="font-medium">{config.companyName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{t('clientInfo.location')}</p>
                <p className="font-medium">{config.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{t('clientInfo.website')}</p>
                <a
                  href={config.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors"
                >
                  {config.website}
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
