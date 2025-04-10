import { Hero } from '@/app/components/portfolio/Hero'
import { AboutSection } from '@/app/components/portfolio/AboutSection'
import { PhotoSection } from '@/app/components/portfolio/PhotoSection'
import { ContactForm } from '@/app/components/contact-form'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

interface GenerateMetadataProps {
  params: Promise<{
    locale: string;
  }>;
}

// Dodajemy generowanie metadanych
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Portfolio-sections.BuildWise.SEO')

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://nextgensites.pl${locale === 'pl' ? '' : `/${locale}`}/buildwise`,
      languages: {
        'pl-PL': locale === 'pl' ? 'https://nextgensites.pl/buildwise' : 'https://nextgensites.pl/buildwise',
        'en-US': locale === 'en' ? 'https://nextgensites.pl/en/buildwise' : 'https://nextgensites.pl/en/buildwise',
      },
    },
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
      images: [{
        url: '/images/buildwise-og.jpg',
        alt: t('ogImageAlt'),
      }],
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
