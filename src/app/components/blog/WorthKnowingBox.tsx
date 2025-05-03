'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface WorthKnowingBoxProps {
  children: React.ReactNode
  className?: string
}

export const WorthKnowingBox = ({ children, className = '' }: WorthKnowingBoxProps) => {
  const t = useTranslations('BlogComponents')

  return (
    <motion.div
      className={`my-10 p-6 rounded-xl shadow-sm relative 
        before:absolute before:inset-0 before:rounded-xl before:border before:border-accent/50 before:shadow-[0_0_15px_rgba(var(--accent-color)/0.15)]
        ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="flex gap-4 relative z-10">


        <div>
          <h3 className="mt-2 text-xl font-semibold mb-2 text-accent text-center">
            {t('worthKnowing.title')}
          </h3>
          <div>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WorthKnowingBox 
