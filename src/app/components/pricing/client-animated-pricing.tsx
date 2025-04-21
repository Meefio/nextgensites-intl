'use client'

import { ReactNode } from 'react'
import { AnimatedElement } from '@/app/components/motion/animated-element'

export function ClientAnimatedWrapper({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <AnimatedElement className={className}>
      {children}
    </AnimatedElement>
  )
}

type PropsWithChildrenAndDelay = {
  children: ReactNode;
  delay?: number;
}

export function ClientAnimatedCard({ children, delay = 0 }: PropsWithChildrenAndDelay) {
  return (
    <AnimatedElement delay={delay}>
      {children}
    </AnimatedElement>
  )
}

export function ClientAnimatedCosts({ children }: { children: ReactNode }) {
  return (
    <AnimatedElement className='mt-10 md:mt-16 max-w-4xl mx-auto'>
      {children}
    </AnimatedElement>
  )
} 
