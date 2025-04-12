'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function FloatingCodeBlocks() {
  const t = useTranslations('Hero')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none">
      <motion.div
        className="absolute hidden 2xl:block top-[-5%] left-[-25%] z-10 w-52 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-md p-3 transform -rotate-6"
        animate={{
          y: [0, -8, 0],
          rotate: [-6, -4, -6],
        }}
        transition={{
          y: { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" },
          rotate: { repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" },
        }}
      >
        <div className="flex items-center mb-1.5">
          <div className="w-2 h-2 rounded-full bg-accent mr-1.5"></div>
          <div className="text-xs text-accent">components/Hero.tsx</div>
        </div>
        <div className="space-y-0.5 text-xs font-mono">
          <div className="text-muted-foreground">{'<div className="hero">'}</div>
          <div className="text-muted-foreground pl-3">{"<h1>Next.js 15</h1>"}</div>
          <div className="text-muted-foreground pl-3">{"<p>Landing page</p>"}</div>
          <div className="text-muted-foreground">{"</div>"}</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute hidden 2xl:block bottom-[-5%] left-[-30%] z-10 w-48 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-md p-3 transform rotate-[-8deg]"
        animate={{
          y: [0, -6, 0],
          rotate: [-8, -6, -8],
        }}
        transition={{
          y: { repeat: Number.POSITIVE_INFINITY, duration: 3.5, ease: "easeInOut" },
          rotate: { repeat: Number.POSITIVE_INFINITY, duration: 5.5, ease: "easeInOut" },
        }}
      >
        <div className="flex items-center mb-1.5">
          <div className="w-2 h-2 rounded-full bg-accent mr-1.5"></div>
          <div className="text-xs text-accent">schema.js</div>
        </div>
        <div className="space-y-0.5 text-xs font-mono">
          <div className="text-muted-foreground">{"export default {"}</div>
          <div className="text-muted-foreground pl-3">{"  name: 'page',"}</div>
          <div className="text-muted-foreground pl-3">{"  type: 'document',"}</div>
          <div className="text-muted-foreground">{"}"}</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute hidden 2xl:block top-[40%] left-[-18%] z-0 w-48 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-md p-3 transform rotate-[3deg]"
        animate={{
          y: [0, -10, 0],
          rotate: [3, 5, 3],
        }}
        transition={{
          y: { repeat: Number.POSITIVE_INFINITY, duration: 4.2, ease: "easeInOut" },
          rotate: { repeat: Number.POSITIVE_INFINITY, duration: 6.2, ease: "easeInOut" },
        }}
      >
        <div className="flex items-center mb-1.5">
          <div className="w-2 h-2 rounded-full bg-accent mr-1.5"></div>
          <div className="text-xs text-accent">next.config.js</div>
        </div>
        <div className="space-y-0.5 text-xs font-mono">
          <div className="text-muted-foreground">{"module.exports = {"}</div>
          <div className="text-muted-foreground pl-3">{"  i18n: {"}</div>
          <div className="text-muted-foreground pl-3">{"    locales: ['pl', 'en']"}</div>
          <div className="text-muted-foreground">{"  }"}</div>
        </div>
      </motion.div>
    </div>
  )
} 
