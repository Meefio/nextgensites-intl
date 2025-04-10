import { Check, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
// import { Switch } from '@/app/components/ui/switch'
import { AnimatedElement } from '@/app/components/motion/animated-element'
import { CountdownTimer } from '@/app/components/client-countdown-timer'
import { ClientPriceDisplay } from './client-price-display'
import { ClientPromoHeader } from './client-promo-header'

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

	return (
		<section
			id='pricing'
			className='w-full bg-[#0c0c0c] dark:bg-background py-16 md:py-28 scroll-mt-header mt-14 md:mt-20 rounded-lg'
		>
			<div className='container flex flex-col items-center gap-6 sm:gap-7'>
				<AnimatedElement className='flex flex-col gap-3'>
					<span className='font-bold uppercase text-primary text-center'>
						{t('why')}
					</span>
					<h2 className='font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center text-white'>
						{t('heading')}
					</h2>
					<p className='text-lg text-gray-300 text-balance max-w-lg text-center'>
						{t('subheading')}
					</p>
					<ClientPromoHeader />
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
								className={`relative h-full shadow-lg bg-zinc-900 ${plan.isPopular ? 'border-2 border-primary' : 'border-zinc-800'}`}
							>
								<CardContent className='flex h-full flex-col p-0'>
									<div className='flex flex-col items-center px-7 py-10'>
										{plan.isPopular && (
											<span className='absolute inset-x-0 -top-5 mx-auto rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground shadow-md w-40'>
												{t('plans.professional.popular')}
											</span>
										)}
										<h3 className='font-heading text-2xl font-semibold text-white'>
											{plan.name}
										</h3>
										<p className='mt-2 text-gray-300 text-center'>
											{plan.description}
										</p>
										<div className='mt-4 flex items-center gap-2 text-gray-300'>
											<Clock className='h-5 w-5' />
											<span>{plan.timeframe}</span>
										</div>
										<div className='mt-5  text-[#e0e0e0]'>
											<ClientPriceDisplay plan={plan} />
										</div>
										<div className='hidden md:block mt-6 w-full'>
											<Button size='lg' asChild className='w-full bg-primary hover:bg-primary/90'>
												<Link href='/#contact'>{t('contactCta')}</Link>
											</Button>
										</div>
									</div>
									<ul className='flex-1 space-y-2 px-7 py-10 border-y border-zinc-800'>
										{plan.features.map((feature: string, featureIndex: number) => (
											<li
												key={featureIndex}
												className='flex items-center gap-3'
											>
												<Check size={24} className='text-primary flex-shrink-0' />
												<span className='text-gray-300'>
													{feature}
												</span>
											</li>
										))}
									</ul>
									<div className='md:hidden px-7 py-4 flex flex-col gap-4 mt-auto'>
										<Button size='lg' asChild className='w-full bg-primary hover:bg-primary/90'>
											<Link href='/#contact'>{t('contactCta')}</Link>
										</Button>
									</div>
									<div className='hidden md:block py-4 mt-auto border-t border-zinc-800 mx-7'>
										<div>
											<p className='text-xs text-gray-400'>
												{plan.key !== 'premium' && t('vatInfo')}
											</p>
											<p className='text-xs text-gray-400'>
												{plan.key === 'basic' && t('depositInfo.basic')}
												{plan.key === 'professional' && t('depositInfo.professional')}
											</p>
											<p className='text-xs text-gray-400'>
												{plan.key === 'basic' && t('lowestPrice.basic')}
												{plan.key === 'professional' && t('lowestPrice.professional')}
											</p>
										</div>
									</div>
									<div className='md:hidden px-7 py-4'>
										<div>
											<p className='text-xs text-gray-400'>
												{plan.key !== 'premium' && t('vatInfo')}
											</p>
											<p className='text-xs text-gray-400'>
												{plan.key === 'basic' && t('depositInfo.basic')}
												{plan.key === 'professional' && t('depositInfo.professional')}
											</p>
											<p className='text-xs text-gray-400'>
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
			</div>
		</section>
	)
}
