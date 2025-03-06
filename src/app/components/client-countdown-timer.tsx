'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export const CountdownTimer = () => {
  const t = useTranslations('Pricing')
  const targetDate = new Date('2025-03-16T23:59:59')
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
