'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface WorthKnowingBoxProps {
  children: React.ReactNode
  className?: string
}

export const WorthKnowingBox = ({ children, className = '' }: WorthKnowingBoxProps) => {
  const t = useTranslations('BlogComponents')

  return (
    <motion.div
      className={`my-10 p-6 border border-accent/20 rounded-xl bg-accent/5 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="rounded-full bg-accent/20 p-2 text-accent">
            <Sparkles size={18} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-accent">
            {t('worthKnowing.title')}
          </h3>
          <div className="text-accent/90">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WorthKnowingBox 
