'use client'


import { Check, Clock } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link' // dodaj ten import
// import { Switch } from '@/app/components/ui/switch'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { useEffect, useState } from 'react'

// Dodaj nowy komponent CountdownTimer
const CountdownTimer = () => {
	const t = useTranslations('Pricing')
	const targetDate = new Date('2025-02-28T23:59:59')
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const calculateTimeLeft = () => {
			const difference = +targetDate - +new Date()

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				})
			}
		}

		const timer = setInterval(calculateTimeLeft, 1000)
		calculateTimeLeft()

		return () => clearInterval(timer)
	}, [])

	const TimeUnit = ({ value, label }: { value: number; label: string }) => (
		<div className="flex flex-col items-center">
			<div className="bg-primary text-primary-foreground rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[70px] text-center">
				<span className="font-heading text-2xl sm:text-3xl font-bold">{value.toString().padStart(2, '0')}</span>
			</div>
			<span className="text-xs sm:text-sm font-medium text-muted-foreground mt-1 sm:mt-2">{label}</span>
		</div>
	)

	return (
		<div className="flex flex-col items-center gap-4 sm:gap-5 mt-4 sm:mt-6">
			<p className="text-sm sm:text-base text-muted-foreground">{t('promoEnds')}</p>
			<div className="flex gap-3 sm:gap-5">
				<TimeUnit value={timeLeft.days} label={t('timer.days')} />
				<TimeUnit value={timeLeft.hours} label={t('timer.hours')} />
				<TimeUnit value={timeLeft.minutes} label={t('timer.minutes')} />
				<TimeUnit value={timeLeft.seconds} label={t('timer.seconds')} />
			</div>
		</div>
	)
}

export function Pricing() {
	const t = useTranslations('Pricing')

	const plans = [
		{
			key: 'basic',
			monthlyPrice: t('plans.basic.monthlyPrice'),
			oneTimePrice: t('plans.basic.oneTimePrice'),
			promoPrice: t('plans.basic.promoPrice'),
			timeframe: t('plans.basic.timeframe'),
			name: t('plans.basic.name'),
			description: t('plans.basic.description'),
			features: t.raw('plans.basic.features') as string[],
		},
		{
			key: 'professional',
			monthlyPrice: t('plans.professional.monthlyPrice'),
			oneTimePrice: t('plans.professional.oneTimePrice'),
			promoPrice: t('plans.professional.promoPrice'),
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
		if (plan.key === 'premium') {
			return (
				<div className='relative h-[60px] flex items-center justify-center'>
					<span className='font-heading text-2xl text-center'>
						{plan.oneTimePrice}
					</span>
				</div>
			)
		}

		return (
			<div className='relative h-[60px] flex flex-col items-center justify-center gap-1'>
				<span className='font-heading text-2xl text-center line-through text-muted-foreground'>
					{plan.oneTimePrice}
				</span>
				<div className='flex flex-col items-center gap-1'>
					<span className='font-heading text-2xl text-center text-primary font-bold'>
						{plan.promoPrice}
					</span>
					<span className='text-sm text-primary font-semibold animate-pulse'>
						{t('promoInfo')}
					</span>
				</div>
			</div>
		)
	}

	return (
		<section
			id='pricing'
			className='container flex flex-col items-center gap-6 py-14 md:py-24 sm:gap-7 scroll-mt-header'
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
				<p className='text-lg font-semibold text-primary animate-pulse text-center'>
					{t('promoHeader')}
				</p>
				<CountdownTimer />
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
									<div className='hidden md:block mt-6 w-full'>
										<Button size='lg' asChild className='w-full'>
											<Link href='/#contact'>{t('contactCta')}</Link>
										</Button>
									</div>
								</div>
								<ul className='flex-1 space-y-2 px-7 py-10 border-y border-border'>
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
								<div className='md:hidden px-7 py-4 flex flex-col gap-4 mt-auto'>
									<Button size='lg' asChild className='w-full'>
										<Link href='/#contact'>{t('contactCta')}</Link>
									</Button>
								</div>
								<div className='hidden md:block py-4 mt-auto border-t border-border mx-7'>
									<div>
										<p className='text-xs text-muted-foreground'>
											{plan.key !== 'premium' && t('vatInfo')}
										</p>
										<p className='text-xs text-muted-foreground'>
											{plan.key === 'basic' && t('depositInfo.basic')}
											{plan.key === 'professional' && t('depositInfo.professional')}
										</p>
										<p className='text-xs text-muted-foreground'>
											{plan.key === 'basic' && t('lowestPrice.basic')}
											{plan.key === 'professional' && t('lowestPrice.professional')}
										</p>
									</div>
								</div>
								<div className='md:hidden px-7 py-4'>
									<div>
										<p className='text-xs text-muted-foreground'>
											{plan.key !== 'premium' && t('vatInfo')}
										</p>
										<p className='text-xs text-muted-foreground'>
											{plan.key === 'basic' && t('depositInfo.basic')}
											{plan.key === 'professional' && t('depositInfo.professional')}
										</p>
										<p className='text-xs text-muted-foreground'>
											{plan.key === 'basic' && t('lowestPrice.basic')}
											{plan.key === 'professional' && t('lowestPrice.professional')}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</AnimatedElement>
				))}
			</div>
		</section>
	)
}
