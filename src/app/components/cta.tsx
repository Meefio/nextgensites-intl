import { Button } from '@/app/components/ui/button'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { HoleBackground } from '@/app/components/ui/hole'

export function CtaSection() {
	const t = useTranslations('CTA')

	return (
		<section className='container relative py-14 md:py-24 rounded-lg border border-border overflow-hidden'>
			<HoleBackground className="absolute inset-0">
				<div className="absolute inset-0" />
			</HoleBackground>
			<div className="relative z-10 flex flex-col items-center gap-6 sm:gap-10">
				<AnimatedElement
					as="h2"
					className='relative font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance max-w-xl sm:leading-tight text-center'
					delay={0.2}
				>
					{t('title')}
				</AnimatedElement>

				<AnimatedElement
					as="p"
					className='relative text-lg text-[#2b2e33] dark:text-[#cacaca] text-balance max-w-lg text-center'
					delay={0.3}
				>
					{t('description')}
				</AnimatedElement>

				<AnimatedElement
					delay={0.4}
					className="scale-100 hover:scale-105 transition-transform duration-300"
				>
					<Button
						size='lg'
						asChild
						variant='default'
						className='relative cursor-pointer border-border'
					>
						<Link href="/#contact">
							{t('button')}
						</Link>
					</Button>
				</AnimatedElement>
			</div>
		</section>
	)
}
