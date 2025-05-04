import { Hero } from '@/app/components/portfolio/Hero'
import { AboutSection } from '@/app/components/portfolio/AboutSection'
import { PhotoSection } from '@/app/components/portfolio/PhotoSection'
import { ContactForm } from '@/app/components/contact-form'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl'

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
  const path = locale === 'pl' ? '/strona-internetowa-dla-firmy-sprzatajacej' : '/cleaning-company-website';
  const canonicalUrl = createCanonicalUrl(path, locale);

  // Create language alternates including x-default
  const languages = createLanguageAlternates(
    '/strona-internetowa-dla-firmy-sprzatajacej',
    '/cleaning-company-website',
    'pl'
  );

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages,
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
      {/* Schema.org Article - zwiększenie widoczności case study w wyszukiwarkach */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "UnderPressure - Nowoczesna strona internetowa dla firmy sprzątającej",
            "image": "https://nextgensites.pl/images/Hero-Underpressure-og-min.jpg",
            "author": {
              "@type": "Person",
              "name": "Michał Rowiński"
            },
            "publisher": {
              "@type": "Organization",
              "name": "NextGen Sites",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nextgensites.pl/images/logo.png"
              }
            },
            "datePublished": "2025-03-15",
            "dateModified": "2025-04-18",
            "description": "Case study prezentujące realizację nowoczesnej strony internetowej dla firmy sprzątającej",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://nextgensites.pl/strona-internetowa-dla-firmy-sprzatajacej"
            },
            "keywords": "case study, firma sprzątająca, underpressure, next.js, strona internetowa, ciemny motyw"
          })
        }}
      />
      <Hero projectKey="underpressure" />
      <AboutSection projectKey="underpressure" />
      <PhotoSection projectKey="underpressure" />
      <ContactForm />
    </>
  )
} 
