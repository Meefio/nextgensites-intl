'use client'

import { useEffect, useState } from 'react'

// Target date for the promotion
const TARGET_DATE = new Date('2025-06-15T23:59:59')

export function ClientSecondsDisplay({ label }: { label: string }) {
  const [seconds, setSeconds] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isPromoActive, setIsPromoActive] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const calculateSeconds = () => {
      const difference = +TARGET_DATE - +new Date()
      const isActive = difference > 0

      if (isActive) {
        setIsPromoActive(true)
        setSeconds(Math.floor((difference / 1000) % 60))
      } else {
        setIsPromoActive(false)
      }
    }

    // Update seconds every second
    const timer = setInterval(calculateSeconds, 1000)
    calculateSeconds() // Initial calculation

    return () => clearInterval(timer)
  }, [])

  // Don't render during SSR or if promo isn't active
  if (!isMounted || !isPromoActive) return null

  return (
    <div className="flex flex-col items-center">
      <div className="bg-linear-to-r from-primary to-orange-500 text-white shadow-md transition-all duration-300 rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[70px] text-center">
        <span className="font-heading text-2xl sm:text-3xl font-bold">{seconds.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs sm:text-sm font-medium text-white dark:text-muted-foreground mt-1 sm:mt-2">{label}</span>
    </div>
  )
} 
