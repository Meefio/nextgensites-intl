import { Hero } from '@/app/components/hero'
import { Header } from '@/app/components/header'
import { SocialProof } from '@/app/components/SocialProof'
import Features from "@/app/components/features-section"
import { About } from '@/app/components/about-section'
import Portfolio from '@/app/components/portfolio-section'
import WhyNotWordPress from '@/app/components/WhyNotWordPress-section'
import { TimelineSection } from '@/app/components/TimelineSection'
import { CtaSection } from '@/app/components/cta'
import { Footer } from '@/app/components/footer'
import { Pricing } from '@/app/components/pricing'
import { Faq } from '@/app/components/faq'
import { ContactForm } from '@/app/components/contact-form'
import { createCanonicalUrl } from '@/app/utils/createCanonicalUrl'
import { Metadata } from 'next'

// Dodajemy ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Odświeżanie co godzinę

interface GenerateMetadataProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const canonicalUrl = createCanonicalUrl('/', locale);

	return {
		alternates: {
			canonical: canonicalUrl,
			languages: {
				'pl-PL': createCanonicalUrl('/', 'pl'),
				'en-US': createCanonicalUrl('/', 'en'),
			},
		},
	}
}

export default function HomePage() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<SocialProof />
				<Features />
				<About />
				<Portfolio />
				<WhyNotWordPress />
				<TimelineSection />
				<CtaSection />
				<Pricing />
				<Faq />
				<ContactForm />
			</main>
			<Footer />
		</>
	)
}
