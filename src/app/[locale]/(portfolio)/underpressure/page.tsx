import { Hero } from '@/app/components/portfolio/Hero'
import { AboutSection } from '@/app/components/portfolio/AboutSection'
import { PhotoSection } from '@/app/components/portfolio/PhotoSection'
import { ContactForm } from '@/app/components/contact-form'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

// Dodajemy generowanie metadanych
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Portfolio-sections.UnderPressure.SEO')

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://nextgensites.pl/underpressure',
      languages: {
        'pl-PL': 'https://nextgensites.pl/underpressure',
        'en-US': 'https://nextgensites.pl/en/underpressure',
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/images/Hero-Underpressure-og-min.jpg',
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
      images: [{
        url: '/images/Hero-Underpressure-og-min.jpg',
        alt: t('ogImageAlt'),
      }],
    },
  }
}

export default function UnderPressureProject() {
  return (
    <>
      <Hero projectKey="underpressure" />
      <AboutSection projectKey="underpressure" />
      <PhotoSection projectKey="underpressure" />
      <ContactForm />
    </>
  )
} 
