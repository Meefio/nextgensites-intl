import { Hero } from '@/app/components/hero'
import { Header } from '@/app/components/header'
import { SocialProof } from '@/app/components/SocialProof'
import Features from "@/app/components/features-section"
import { About } from '@/app/components/about-section'
export default function HomePage() {
	return (
		<div className='container'>
			<Header />
			<main>
				<Hero />
				<SocialProof />
				<Features />
				<About />
			</main>
		</div>
	)
}
