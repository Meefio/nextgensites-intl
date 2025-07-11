'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface NextArticleBoxProps {
  title: string
  slug?: string
  description?: string
  className?: string
  locale: 'en' | 'pl'
}



export const NextArticleBox = ({
  title,
  slug,
  description,
  locale = 'pl',
  className = ''
}: NextArticleBoxProps) => {
  // Check if slug is valid (not undefined, null, empty or just whitespace)
  const isValidSlug = slug && slug.trim().length > 0

  // Construct the href based on locale and slug
  const hrefPath = isValidSlug
    ? `/${locale === 'en' ? 'en/knowledge-base' : 'baza-wiedzy'}/${slug}`
    : '/' // Default to homepage when no valid slug is available

  // If no valid slug is provided, render without Link
  if (!isValidSlug) {
    return (
      <motion.div
        className={`my-12 p-6 border border-primary/20 rounded-xl bg-primary/5 shadow-xs ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
          {locale === 'pl' ? 'Przeczytaj również' : 'Read also'}
        </h3>

        <div>
          <span className="text-lg font-medium text-primary">{title}</span>

          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`my-12 p-6 border border-primary/20 rounded-xl bg-primary/1 shadow-xs ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
        {locale === 'pl' ? 'Przeczytaj również' : 'Read also'}
      </h3>

      <div>
        <Link
          href={hrefPath}
          className="group flex items-center text-lg font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span>{title}</span>
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {description && <p className="mt-2">{description}</p>}

        <Link
          href={hrefPath}
          className="mt-4 inline-block text-sm font-medium text-primary"
        >
          {locale === 'pl' ? 'Przejdź do artykułu' : 'Go to article'} →
        </Link>
      </div>
    </motion.div>
  )
}

export default NextArticleBox 
