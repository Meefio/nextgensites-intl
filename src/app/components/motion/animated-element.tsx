"use client"

import { motion, useInView, type UseInViewOptions } from "framer-motion"
import { forwardRef, useRef } from "react"

type MotionTags = "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "section" | "li" | 'ul'

interface AnimatedElementProps {
  as?: MotionTags
  children?: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  viewport?: UseInViewOptions
  className?: string
  initial?: any
  animate?: any
  transition?: any
  exit?: any
  // Allow any other motion props
  [key: string]: any
}

export const AnimatedElement = forwardRef<HTMLElement, AnimatedElementProps>(
  ({
    as = "div",
    children,
    delay = 0,
    direction = "up",
    viewport = { once: true, amount: 0.15 },
    className,
    initial: customInitial,
    animate: customAnimate,
    transition: customTransition,
    ...props
  }, ref) => {
    const localRef = useRef(null)
    const targetRef = (ref || localRef) as React.RefObject<HTMLElement>

    const isInView = useInView(targetRef, viewport)

    const MotionComponent = (motion as any)[as] || motion.div

    const getInitialDirection = () => {
      switch (direction) {
        case "up": return { y: 20 }
        case "down": return { y: -20 }
        case "left": return { x: 20 }
        case "right": return { x: -20 }
        default: return { y: 20 }
      }
    }

    // Use custom initial/animate if provided, otherwise use defaults
    const initialProps = customInitial || { opacity: 0, ...getInitialDirection() }
    const animateProps = customAnimate || (isInView ? {
      opacity: 1,
      y: direction === "up" || direction === "down" ? 0 : undefined,
      x: direction === "left" || direction === "right" ? 0 : undefined
    } : undefined)
    const transitionProps = customTransition || {
      duration: 0.5,
      delay,
      ease: [0.4, 0, 0.2, 1],
    }

    return (
      <MotionComponent
        ref={targetRef}
        className={className}
        initial={initialProps}
        animate={animateProps}
        transition={transitionProps}
        {...props}
      >
        {children}
      </MotionComponent>
    )
  }
)

AnimatedElement.displayName = "AnimatedElement" 
