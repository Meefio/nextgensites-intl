import { useTranslations } from 'next-intl'
import { Hero } from '@/app/components/hero'

export default function HomePage() {
	const t = useTranslations('HomePage')
	return (
		<div className='container'>
			<main>
				<Hero />
			</main>
		</div>
	)
}
