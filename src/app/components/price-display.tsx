import { isPromoActive } from './promo-status'
import { useTranslations } from 'next-intl'

type PlanType = {
  key: string
  oneTimePrice: string
  promoPrice?: string
}

export function PriceDisplay({ plan }: { plan: PlanType }) {
  const t = useTranslations('Pricing')
  const promoActive = isPromoActive()

  if (plan.key === 'premium' || !promoActive) {
    return (
      <div className='relative h-[60px] flex items-center justify-center'>
        <span className='font-heading text-2xl text-center font-semibold'>
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
