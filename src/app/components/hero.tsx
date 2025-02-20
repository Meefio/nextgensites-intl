import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { TextShimmer } from '@/app/components/magicui/text-shimmer'
import { Button } from '@/app/components/ui/button'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { MouseTrackImage } from '@/app/components/motion/mouse-track-image'

export function Hero() {
	const t = useTranslations('Hero')

	return (
		<section className='container flex flex-col items-center gap-10 pb-14 pt-12 md:pb-28 md:pt-24 sm:gap-14 lg:flex-row'>
			<div className='flex flex-1 flex-col items-center gap-6 lg:items-start lg:gap-8'>
				<AnimatedElement as='div' delay={0.1}>
					<Link
						href='/#pricing'
						scroll={true}
						className='inline-flex h-7 items-center justify-between rounded-full border bg-secondary text-secondary-foreground px-3 text-xs transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem]'
					>
						<TextShimmer className='inline-flex items-center justify-center'>
							<span className='text-xs text-secondary-foreground/80'>
								{t('pricing')}
							</span>
							<ArrowRight
								size={20}
								className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5'
							/>
						</TextShimmer>
					</Link>
				</AnimatedElement>

				<AnimatedElement
					as='h1'
					delay={0.2}
					className='max-w-[38rem] text-center font-heading text-4xl font-semibold sm:text-5xl lg:text-left tracking-tight'
				>
					{t('title')}
				</AnimatedElement>

				<AnimatedElement
					as='p'
					delay={0.3}
					className='max-w-md text-center text-lg text-muted-foreground lg:text-left'
				>
					{t('description')}
				</AnimatedElement>

				<AnimatedElement delay={0.4}>
					<div className='grid gap-3'>
						<Button size='lg' asChild>
							<Link href="/#benefits">
								{t('cta')}
							</Link>
						</Button>
					</div>
				</AnimatedElement>
			</div>

			<AnimatedElement
				delay={0.5}
				className='relative flex-1'
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
			>
				<MouseTrackImage
					alt='Przykład nowoczesnej strony internetowej'
					src='/images/MacBookProHero.png'
					width={608}
					height={368}
					priority
					quality={100}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1482px'
				/>
				<div className='absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]' />
			</AnimatedElement>
		</section>
	)
}
