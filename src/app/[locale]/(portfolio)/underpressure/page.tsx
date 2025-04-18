import { Hero } from '@/app/components/portfolio/Hero'
import { AboutSection } from '@/app/components/portfolio/AboutSection'
import { PhotoSection } from '@/app/components/portfolio/PhotoSection'
import { ContactForm } from '@/app/components/contact-form'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { createCanonicalUrl } from '@/app/utils/createCanonicalUrl'

// Dodajemy ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Odświeżanie co godzinę

interface GenerateMetadataProps {
  params: Promise<{
    locale: string;
  }>;
}

// Dodajemy generowanie metadanych
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Portfolio-sections.UnderPressure.SEO')
  const canonicalUrl = createCanonicalUrl('/underpressure', locale);

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pl-PL': createCanonicalUrl('/underpressure', 'pl'),
        'en-US': createCanonicalUrl('/underpressure', 'en'),
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
