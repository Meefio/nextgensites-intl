import { useTranslations } from 'next-intl'
import { getTimeLeft, isPromoActive } from './promo-status'
import { ClientSecondsDisplay } from './client-seconds-display'

// Time unit component
function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-linear-to-r from-primary to-orange-500 text-white shadow-md transition-all duration-300 rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[70px] text-center">
        <span className="font-heading text-2xl sm:text-3xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs sm:text-sm font-medium text-white dark:text-muted-foreground mt-1 sm:mt-2">{label}</span>
    </div>
  )
}

export function CountdownTimer() {
  const t = useTranslations('Pricing')
  const promoActive = isPromoActive()
  const timeLeft = getTimeLeft()

  // Don't render if promo isn't active
  if (!promoActive || !timeLeft) return null

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-2">
      <p className="text-sm sm:text-base text-white dark:text-muted-foreground">{t('promoEnds')}</p>
      <div className="flex gap-3 sm:gap-5">
        <TimeUnit value={timeLeft.days} label={t('timer.days')} />
        <TimeUnit value={timeLeft.hours} label={t('timer.hours')} />
        <TimeUnit value={timeLeft.minutes} label={t('timer.minutes')} />
        <ClientSecondsDisplay label={t('timer.seconds')} />
      </div>
    </div>
  )
} 
