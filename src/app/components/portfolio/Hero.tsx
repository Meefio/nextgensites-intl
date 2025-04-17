import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedElement } from '@/app/components/motion/animated-element'

// Mapa konfiguracji specyficznych dla projektów
const projectConfig = {
  underpressure: {
    heroImage: '/images/UnderpressureHero.webp',
    liveUrl: 'https://myciecisnieniem.pl',
    altText: 'Under Pressure Hero',
    translationNamespace: 'UnderPressure'
  },
  buildwise: {
    heroImage: '/images/background-buildwise.webp',
    liveUrl: 'https://buildwise-alpha.vercel.app/pl',
    altText: 'BuildWise Hero',
    translationNamespace: 'BuildWise'
  }
}

interface HeroProps {
  projectKey: 'underpressure' | 'buildwise'
}

export function Hero({ projectKey }: HeroProps) {
  const config = projectConfig[projectKey] || projectConfig.underpressure

  // Używamy dokładnej nazwy klucza zamiast dynamicznego tworzenia
  const t = useTranslations(`Portfolio-sections.${config.translationNamespace}`)

  return (
    <div className="relative h-[75vh] mb-8">
      <Image
        src={config.heroImage}
        alt={config.altText}
        fill
        priority
        className="object-cover object-top rounded-xl"
        quality={100}
        title={config.altText}
      />
      <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-center md:-mt-28">
        <div className="container">
          <AnimatedElement as='span' delay={0.1}>
            <p className="font-bold uppercase text-white mb-4">
              {t('Common.portfolio')}
            </p>
          </AnimatedElement>

          <AnimatedElement
            as='h1'
            delay={0.2}
            className='font-heading text-4xl max-w-2xl font-semibold sm:text-5xl tracking-tight text-white mb-6'
          >
            {t('title')}
          </AnimatedElement>

          <AnimatedElement
            as='p'
            delay={0.3}
            className='text-lg text-white/90 mb-10 max-w-xl'
          >
            {t('description')}
          </AnimatedElement>

          <AnimatedElement delay={0.5} className="flex gap-4">
            <Link
              href={`/${projectKey}/#contact`}
              prefetch={true}
              className="inline-flex h-11 items-center text-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t('cta')}
            </Link>
            <Link
              href={config.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center text-center justify-center rounded-md border border-white/20 px-8 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t('viewLive')}
            </Link>
          </AnimatedElement>
        </div>
      </div>
    </div>
  )
}
