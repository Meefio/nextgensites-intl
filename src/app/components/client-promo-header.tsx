'use client'

import { usePromoStatus } from './client-countdown-timer'
import { useTranslations } from 'next-intl'

export const ClientPromoHeader = () => {
  const t = useTranslations('Pricing')
  const isPromoActive = usePromoStatus()

  if (!isPromoActive) return null

  return (
    <p className='text-lg font-semibold text-[#0DA2E7] dark:text-primary animate-pulse text-center mt-4'>
      {t('promoHeader')}
    </p>
  )
} 
