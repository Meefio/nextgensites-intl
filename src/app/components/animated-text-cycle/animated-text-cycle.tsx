'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type TextCycleProps = {
  texts: string[]
  interval?: number
  className?: string
  initialDelay?: number
}

export function AnimatedTextCycle({
  texts,
  interval = 10000,
  className,
  initialDelay = 0,
}: TextCycleProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Początkowe opóźnienie przed uruchomieniem cyklu animacji
    const initialDelayTimeout = setTimeout(() => {
      // Ustawienie interwału animacji
      const intervalId = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
      }, interval)

      return () => clearInterval(intervalId)
    }, initialDelay)

    return () => clearTimeout(initialDelayTimeout)
  }, [texts, interval, initialDelay])

  // Jeśli komponent nie jest jeszcze wyrenderowany po stronie klienta, pokaż pierwszy tekst
  if (!isClient) {
    return <span className={className}>{texts[0]}</span>
  }

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentTextIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className={cn("inline-block", className)}
        >
          {texts[currentTextIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
} 
