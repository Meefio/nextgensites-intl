// import { Check, Clock } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
// import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'
// import { Switch } from '@/app/components/ui/switch'
// import { PriceDisplay } from './price-display'
// import { PromoHeader } from './promo-header'
// import { CountdownTimer } from './countdown-timer'
// import { ClientAnimatedWrapper, ClientAnimatedCard } from './pricing/client-animated-pricing'
import { ClientAnimatedCosts } from './pricing/client-animated-pricing'
import { MaintenanceCostsSkeleton } from './pricing/maintenance-costs-skeleton'

export async function Pricing() {
	const t = await getTranslations('Pricing')
	const tContact = await getTranslations('Contact')

	// SEKCJE CENOWE ZAKOMENTOWANE - WYŁĄCZONE WYŚWIETLANIE CEN PRODUKTÓW
	// Zachowujemy tylko sekcję "Niskie koszty utrzymania"
	/*
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
	*/

	return (
		<section
			id='pricing'
			className='w-full bg-[#0c0c0c] dark:bg-background pb-16 md:pb-28 scroll-mt-header mt-14 md:mt-20 rounded-lg'
		>
			<div className='container flex flex-col items-center gap-6 sm:gap-7'>
				{/* ZAKOMENTOWANO SEKCJĘ NAGŁÓWKOWĄ Z CENAMI I PROMOCJAMI */}
				{/*
				<ClientAnimatedWrapper className='flex flex-col gap-3'>
					<span className='font-bold uppercase text-primary text-center'>
						{t('why')}
					</span>
					<h2 className='font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center text-white'>
						{t('heading')}
					</h2>
					<p className='text-lg text-gray-300 text-balance max-w-lg text-center'>
						{t('subheading')}
					</p>
					<PromoHeader />
					<CountdownTimer />
				</ClientAnimatedWrapper>
				*/}

				{/* ZAKOMENTOWANO SEKCJĘ Z KARTAMI PAKIETÓW CENOWYCH */}
				{/*
				<div className='mt-7 grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
					{plans.map((plan) => (
						<ClientAnimatedCard
							key={plan.key}
							delay={0}
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
											<PriceDisplay plan={plan} />
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
												<Check size={24} className='text-primary shrink-0' />
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
						</ClientAnimatedCard>
					))}
				</div>
				*/}

				{/* ZACHOWANO TYLKO SEKCJĘ "NISKIE KOSZTY UTRZYMANIA" */}
				{/* Dodano lepsze wyśrodkowanie i stylizację dla standalone sekcji */}
				<Suspense fallback={<MaintenanceCostsSkeleton />}>
					<ClientAnimatedCosts>
						<div className='bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto'>
							<div className='text-center mb-8'>
								<span className='inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4'>
									{t('badgeLabel')}
								</span>
								<h2 className='text-2xl md:text-3xl font-semibold text-white mb-4'>
									{t('maintenanceCosts.heading')}
								</h2>
								<p className='text-gray-200 text-lg md:text-xl max-w-2xl mx-auto'>
									{t('maintenanceCosts.description')}
								</p>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
								<div className='flex flex-col items-center p-6 bg-zinc-800/40 rounded-xl border border-zinc-700/50 hover:border-primary/30 transition-colors'>
									<p className='text-center text-primary font-semibold mb-3 text-lg'>{t('maintenanceCosts.domain.title')}</p>
									<p className='text-gray-300 text-center'>{t('maintenanceCosts.domain.description')}</p>
								</div>
								<div className='flex flex-col items-center p-6 bg-zinc-800/40 rounded-xl border border-zinc-700/50 hover:border-primary/30 transition-colors'>
									<p className='text-center text-primary font-semibold mb-3 text-lg'>{t('maintenanceCosts.hosting.title')}</p>
									<p className='text-gray-300 text-center'>{t('maintenanceCosts.hosting.description')}</p>
								</div>
								<div className='flex flex-col items-center p-6 bg-zinc-800/40 rounded-xl border border-zinc-700/50 hover:border-primary/30 transition-colors'>
									<p className=' text-center text-primary font-semibold mb-3 text-lg'>{t('maintenanceCosts.email.title')}</p>
									<p className='text-gray-300 text-center'>{t('maintenanceCosts.email.description')}</p>
								</div>
								<div className='flex flex-col items-center p-6 bg-zinc-800/40 rounded-xl border border-zinc-700/50 hover:border-primary/30 transition-colors'>
									<p className=' text-center text-primary font-semibold mb-3 text-lg'>{t('maintenanceCosts.form.title')}</p>
									<p className='text-gray-300 text-center'>{t('maintenanceCosts.form.description')}</p>
								</div>
							</div>

							{/* Dodano CTA button dla kontaktu */}
							<div className='text-center'>
								<Button size='lg' asChild className='bg-primary hover:bg-primary/90 px-8'>
									<Link href='/#contact'>
										{tContact('title')}
									</Link>
								</Button>
							</div>
						</div>
					</ClientAnimatedCosts>
				</Suspense>
			</div>
		</section>
	)
}
