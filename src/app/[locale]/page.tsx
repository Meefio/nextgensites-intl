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
