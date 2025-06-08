import { Hero, Services, Features, Portfolio, About, Process, Testimonials } from './components'
import { CtaSection } from '@/app/components/cta'
import { ContactForm } from '@/app/components/contact-form'
import { Header } from '@/app/components/header'
import { Footer } from '@/app/components/footer'
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl'
import { Metadata } from 'next'

// ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Refresh every hour

interface GenerateMetadataProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === 'pl' ? '/szablony-framer' : '/framer-templates';
  const canonicalUrl = createCanonicalUrl(path, locale);

  const languages = createLanguageAlternates('/szablony-framer', '/framer-templates', 'pl');

  const title = locale === 'pl'
    ? 'Szablony Framer - Profesjonalne animacje i interakcje'
    : 'Framer Templates - Professional animations and interactions';

  const description = locale === 'pl'
    ? 'Odkryj nasze szablony Framer z zaawansowanymi animacjami i interakcjami. Idealne dla nowoczesnych stron internetowych i aplikacji.'
    : 'Discover our Framer templates with advanced animations and interactions. Perfect for modern websites and applications.';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/images/framer-templates-og.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{
        url: '/images/framer-templates-og.jpg',
        alt: title,
      }],
    },
  }
}

export default async function FramerTemplatesPage({ params }: GenerateMetadataProps) {
  const { locale } = await params;

  // Schema.org for Framer Templates
  const templatesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Framer Templates",
    "provider": {
      "@type": "Organization",
      "name": "NextGen Sites",
      "url": "https://nextgensites.pl"
    },
    "description": locale === 'pl'
      ? "Profesjonalne szablony Framer z zaawansowanymi animacjami i interakcjami"
      : "Professional Framer templates with advanced animations and interactions",
    "offers": {
      "@type": "Offer",
      "name": locale === 'pl' ? "Szablony Framer" : "Framer Templates",
      "description": locale === 'pl'
        ? "Gotowe do użycia szablony z animacjami"
        : "Ready-to-use templates with animations",
      "price": locale === 'pl' ? "Od 299" : "From 79",
      "priceCurrency": locale === 'pl' ? "PLN" : "USD"
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(templatesSchema)
          }}
        />

        <Hero locale={locale} />
        <Services locale={locale} />

        {/* Section divider */}
        <div className="py-8">
          <div className="container mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <Features locale={locale} />

        <div className="py-8">
          <div className="container mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <Process locale={locale} />

        <div className="py-8">
          <div className="container mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <Portfolio locale={locale} />

        <div className="py-8">
          <div className="container mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <About locale={locale} />

        <div className="py-8">
          <div className="container mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <Testimonials locale={locale} />

        <div className="py-8">
          <div className="container mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <CtaSection />

        <div className="py-8">
          <div className="container mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <ContactForm />
      </main>
      <Footer />
    </>
  )
} 
