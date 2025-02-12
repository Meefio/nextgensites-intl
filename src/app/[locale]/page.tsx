import { useTranslations } from 'next-intl'
import { Hero } from '@/app/components/hero'
import { Header } from '@/app/components/header'
import { SocialProof } from '@/app/components/SocialProof'

export default function HomePage() {
	const t = useTranslations('HomePage')
	return (
		<div className='container'>
			<Header />
			<main>
				<Hero />
				<SocialProof />
			</main>
		</div>
	)
}
