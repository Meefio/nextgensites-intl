import { useTranslations } from 'next-intl'
import { isPromoActive } from './promo-status'

export function PromoHeader() {
  const t = useTranslations('Pricing')
  const promoActive = isPromoActive()

  // Don't render if promo isn't active
  if (!promoActive) return null

  return (
    <p className='text-lg font-semibold text-[#0DA2E7] dark:text-primary animate-pulse text-center mt-4'>
      {t('promoHeader')}
    </p>
  )
} 
