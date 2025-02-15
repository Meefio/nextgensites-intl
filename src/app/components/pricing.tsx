'use client'


import { Check, Clock } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link' // dodaj ten import
// import { Switch } from '@/app/components/ui/switch'
import { AnimatedElement } from '@/app/components/motion/animated-element'

export function Pricing() {
	const t = useTranslations('Pricing')

	const plans = [
		{
			key: 'basic',
			monthlyPrice: t('plans.basic.monthlyPrice'),
			oneTimePrice: t('plans.basic.oneTimePrice'),
			timeframe: t('plans.basic.timeframe'),
			name: t('plans.basic.name'),
			description: t('plans.basic.description'),
			features: t.raw('plans.basic.features') as string[],
		},
		{
			key: 'professional',
			monthlyPrice: t('plans.professional.monthlyPrice'),
			oneTimePrice: t('plans.professional.oneTimePrice'),
			timeframe: t('plans.professional.timeframe'),
			name: t('plans.professional.name'),
			description: t('plans.professional.description'),
			features: t.raw('plans.professional.features') as string[],
			isPopular: true,
		},
		{
			key: 'premium',
			monthlyPrice: t('plans.premium.monthlyPrice'),
			oneTimePrice: t('plans.premium.oneTimePrice'),
			timeframe: t('plans.premium.timeframe'),
			name: t('plans.premium.name'),
			description: t('plans.premium.description'),
			features: t.raw('plans.premium.features') as string[],
		},
	]

	const PriceDisplay = ({ plan }: { plan: typeof plans[0] }) => {
		return (
			<div className='relative h-[60px] flex items-center justify-center'>
				<div>
					<span className='font-heading text-2xl text-center'>
						{plan.oneTimePrice}
					</span>
				</div>
			</div>
		)
	}

	return (
		<section
			id='cennik'
			className='flex flex-col items-center gap-6 py-14 md:py-24 sm:gap-7 scroll-mt-header'
		>
			<AnimatedElement className='flex flex-col gap-3'>
				<span className='font-bold uppercase text-primary text-center'>
					{t('why')}
				</span>
				<h2 className='font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center'>
					{t('heading')}
				</h2>
				<p className='text-lg text-muted-foreground text-balance max-w-lg text-center'>
					{t('subheading')}
				</p>
			</AnimatedElement>

			{/* <AnimatedElement className='flex items-center gap-2 mt-4'>
				<span
					className={
						isMonthly ? 'text-foreground' : 'text-muted-foreground'
					}
					>
						Subskrypcyjnie
				</span>
				<Switch
					checked={!isMonthly}
					onCheckedChange={() => setIsMonthly(!isMonthly)}
					className='data-[state=checked]:bg-primary'
					aria-label={
						isMonthly
							? 'Zmień na opcję jednorazową'
							: 'Zmień na opcję subskrypcyjną'
					}
				/>
				<span
					className={
						!isMonthly ? 'text-foreground' : 'text-muted-foreground'
					}
				>
					Jednorazowo
				</span>
			</AnimatedElement> */}

			<div className='mt-7 grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
				{plans.map((plan, index) => (
					<AnimatedElement
						key={plan.key}
						delay={typeof window !== 'undefined' && window.innerWidth >= 768 ? index * 0.2 : 0}
					>
						<Card
							className={`relative h-full shadow-lg ${plan.isPopular ? 'border-2 border-primary' : ''}`}
						>
							<CardContent className='flex h-full flex-col p-0'>
								<div className='flex flex-col items-center px-7 py-10'>
									{plan.isPopular && (
										<span className='absolute inset-x-0 -top-5 mx-auto rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md w-40'>
											{t('plans.professional.popular')}
										</span>
									)}
									<h3 className='font-heading text-2xl font-semibold text-foreground'>
										{plan.name}
									</h3>
									<p className='mt-2 text-muted-foreground text-center'>
										{plan.description}
									</p>
									<div className='mt-4 flex items-center gap-2 text-muted-foreground'>
										<Clock className='h-5 w-5' />
										<span>{plan.timeframe}</span>
									</div>
									<div className='mt-5'>
										<PriceDisplay plan={plan} />
									</div>
									<Button size='lg' asChild className='mt-10 w-full'>
										<Link href='/kontakt'>{t('contactCta')}</Link>
									</Button>
								</div>
								<ul className='flex-1 space-y-2 px-7 py-10'>
									{plan.features.map((feature: string, featureIndex: number) => (
										<li
											key={featureIndex}
											className='flex items-center gap-3'
										>

											<Check size={24} className='text-primary flex-shrink-0' />

											<span className='text-muted-foreground'>
												{feature}
											</span>
										</li>
									))}
								</ul>
								<div className='px-7 py-4'>
									<p className='text-xs text-muted-foreground'>
										{plan.key !== 'premium' && t('vatInfo')}
									</p>
									<p className='text-xs text-muted-foreground'>
										{plan.key === 'basic' && t('depositInfo.basic')}
										{plan.key === 'professional' && t('depositInfo.professional')}
									</p>
								</div>
							</CardContent>
						</Card>
					</AnimatedElement>
				))}
			</div>
		</section>
	)
}
