import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedElement } from '@/app/components/motion/animated-element'

export function Hero() {
  const t = useTranslations('Portfolio-sections.UnderPressure')

  return (
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
            className='font-heading text-4xl font-semibold sm:text-5xl tracking-tight text-dark mb-4'
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
  )
}
