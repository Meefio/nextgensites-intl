"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedElement } from "@/app/components/motion/animated-element"
import Image from "next/image"
import { useTranslations } from 'next-intl'

export function SocialProof() {
  const t = useTranslations('SocialProof')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px" // Rozpocznie animację 200px przed widocznością elementu
  })

  const logos = [
    { alt: "Nike", src: "/images/nike.svg", className: "dark:invert", title: "Nike - logo" },
    { alt: "OpenAI", src: "/images/openai.svg", className: "dark:invert", title: "OpenAI - logo" },
    { alt: "Tiktok", src: "/images/tiktok.svg", className: "dark:invert", title: "Tiktok - logo" },
    { alt: "twitch", src: "/images/twitch.svg", className: "dark:brightness-95", title: "Twitch - logo" }
  ]

  return (
    <section
      ref={sectionRef}
      className="text-center mx-auto max-w-[80rem] px-6 md:px-8 min-h-72"
    >
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <AnimatedElement
          as="h2"
          delay={isInView ? 0.2 : 0}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          className="text-center text-sm font-semibold text-muted-foreground mt-6 md:mt-16"
        >
          {t('title')}
        </AnimatedElement>

        {/* Mobilna wersja listy logo */}
        <div className="mt-6 md:hidden">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white">
            {logos.map((logo) => (
              <li key={logo.alt}>
                <Image
                  alt={logo.alt}
                  src={logo.src}
                  width={112}
                  height={32}
                  className={`px-2 ${logo.className}`}
                  title={logo.title}
                  quality={80}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktopowa wersja listy logo z animacjami */}
        <AnimatedElement
          delay={isInView ? 0.3 : 0}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          className="hidden md:block mt-8"
        >
          <div className="mt-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white">
              {logos.map((logo, index) => (
                <AnimatedElement
                  key={logo.alt}
                  as="li"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20
                  }}
                  className="md:hover:scale-90 md:transition-all duration-300"
                  transition={{
                    duration: 0.5,
                    delay: isInView ? 0.4 + (index * 0.1) : 0,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <Image
                    alt={logo.alt}
                    src={logo.src}
                    width={112}
                    height={32}
                    className={`px-2 ${logo.className}`}
                    title={logo.title}
                    quality={80}
                    loading="lazy"
                  />
                </AnimatedElement>
              ))}
            </ul>
          </div>
        </AnimatedElement>
      </div>
      <AnimatedElement
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
        transition={{
          duration: 0.8,
          delay: isInView ? 0.6 : 0,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div className="[--color:hsl(var(--accent))] pointer-events-none relative -z-[2] mx-auto h-[80rem] mt-[-33rem] mb-[-40rem] sm:h-[70rem] sm:mt-[-25rem] sm:mb-[-32rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-border after:bg-background" />
      </AnimatedElement>
    </section>
  )
}
