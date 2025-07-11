'use client'

import { motion } from 'framer-motion'

interface WorthKnowingBoxProps {
  children: React.ReactNode
  className?: string
  locale: 'en' | 'pl'
}

export const WorthKnowingBox = ({
  children,
  className = '',
  locale
}: WorthKnowingBoxProps) => {
  return (
    <motion.div
      className={`my-10 p-6 rounded-xl shadow-xs relative 
        before:absolute before:inset-0 before:rounded-xl before:border before:border-accent/50 before:shadow-[0_0_15px_rgba(var(--accent-color)/0.15)]
        ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="flex gap-4 relative z-10">
        <div>
          <h3 className="mt-2 text-xl font-semibold mb-2 text-accent text-center">
            {locale === 'pl' ? 'Warto wiedzieć' : 'Worth knowing'}
          </h3>
          <div className="text-center">{children}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default WorthKnowingBox 
