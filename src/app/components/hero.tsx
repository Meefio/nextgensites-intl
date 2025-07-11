import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Suspense } from 'react'

import { TextShimmer } from '@/app/components/magicui/text-shimmer'
import { Button } from '@/app/components/ui/button'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { MouseTrackImage } from '@/app/components/motion/mouse-track-image'
import { FloatingCodeBlocks } from '@/app/components/motion/floating-code-blocks'
import { AnimatedTextCycle } from '@/app/components/animated-text-cycle'

interface HeroProps {
	locale?: string;
	priorityImage?: boolean;
}

export function Hero({ locale: propLocale, priorityImage = true }: HeroProps) {
	const t = useTranslations('Hero')
	const contextLocale = useLocale()
	const locale = propLocale || contextLocale

	// Tablica rotujących tekstów
	const rotatingTexts = [
		t('rotatingTexts.modern'),
		t('rotatingTexts.fast'),
		t('rotatingTexts.converting'),
		t('rotatingTexts.attractive'),
		t('rotatingTexts.responsive'),
		t('rotatingTexts.optimized'),
		t('rotatingTexts.professional')
	]

	return (
		<section className='container flex flex-col items-center gap-10 pb-14 pt-10 md:pb-28 lg:pt-24 sm:gap-14 lg:flex-row'>
			<div className='flex flex-1 flex-col items-center gap-6 lg:items-start lg:gap-8'>
				<div className='-mb-5'>
					<AnimatedElement as='div' delay={0.1}>
						<Link
							href='/#pricing'
							scroll={true}
							className='inline-flex items-center justify-between rounded-full border bg-secondary text-secondary-foreground px-3 text-xs transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem]'
						>
							<TextShimmer className='inline-flex items-center justify-center' />
							<ArrowRight
								size={20}
								className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5'
							/>
						</Link>
					</AnimatedElement>
				</div>
				<AnimatedElement
					as='h1'
					delay={0.2}
					className='max-w-[38rem] text-center font-heading text-3xl font-semibold sm:text-5xl lg:text-left tracking-tight'
				>
					<Suspense fallback={<span>{rotatingTexts[0]}</span>}>
						<AnimatedTextCycle
							texts={rotatingTexts}
							interval={3000}
						/>
					</Suspense>
					{locale === 'pl' ? (
						<span className='text-black dark:text-white'>
							{' '}strona <br /> internetowa{' '}
							<span className="text-primary">Premium</span> w Next.js
						</span>
					) : (
						<span className='text-black dark:text-white'>
							{' '}<span className="text-primary">Premium</span><br /> website in Next.js
						</span>
					)}
					<span className="ml-2 inline-block animate-rocket">🚀</span>
				</AnimatedElement>

				<AnimatedElement
					as='p'
					delay={0.3}
					className='max-w-xl text-center text-lg text-muted-foreground lg:text-left'
				>
					{t('description')}
				</AnimatedElement>

				<AnimatedElement delay={0.4}>
					<div className='grid md:grid-cols-2 gap-3'>
						<Button size='lg' asChild>
							<Link href="/#benefits">
								{t('cta')}
							</Link>
						</Button>
						<Button className='hidden md:flex' size='lg' variant='outline' asChild>
							<Link href="/#portfolio">
								Portfolio
							</Link>
						</Button>
					</div>
				</AnimatedElement>
			</div>

			<AnimatedElement
				delay={0.5}
				className='relative flex-1 xl:ml-24'
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
			>
				<div className="relative xl:ml-8">
					<MouseTrackImage
						alt='Przykład nowoczesnej strony internetowej'
						src='/images/MacBookProHero.png'
						title='Przykład nowoczesnej strony internetowej'
						width={608}
						height={368}
						quality={80}
						priority={priorityImage}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 608px'
					/>
					<div className='hidden md:block absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]' />

					{/* Floating code blocks */}
					<FloatingCodeBlocks />
				</div>
			</AnimatedElement>
		</section>
	)
}
