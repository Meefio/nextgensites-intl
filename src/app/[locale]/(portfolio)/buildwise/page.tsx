import { Hero } from '@/app/components/portfolio/Hero'
import { AboutSection } from '@/app/components/portfolio/AboutSection'
import { PhotoSection } from '@/app/components/portfolio/PhotoSection'
import { ContactForm } from '@/app/components/contact-form'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

// Dodajemy generowanie metadanych
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Portfolio-sections.BuildWise.SEO')

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/images/buildwise-og.jpg',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/images/buildwise-og.jpg'],
    },
  }
}

export default function BuildWiseProject() {
  return (
    <>
      <Hero projectKey="buildwise" />
      <AboutSection projectKey="buildwise" />
      <PhotoSection projectKey="buildwise" />
      <ContactForm />
    </>
  )
} 
