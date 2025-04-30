'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

interface NextArticleBoxProps {
  title: string
  slug?: string
  description?: string
  className?: string
  locale?: string
}

export const NextArticleBox = ({ title, slug, description, locale = 'pl', className = '' }: NextArticleBoxProps) => {
  const t = useTranslations('BlogComponents')

  // Check if slug is valid (not undefined, null, empty or just whitespace)
  const isValidSlug = slug && slug.trim().length > 0

  // Construct the href based on locale and slug, only if slug is valid
  const href = isValidSlug ? `/${locale === 'en' ? 'en/' : ''}baza-wiedzy/${slug}` : undefined

  // If no valid slug is provided, render without Link
  if (!isValidSlug) {
    return (
      <motion.div
        className={`my-12 p-6 border border-primary/20 rounded-xl bg-primary/5 shadow-sm ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
          {t('nextArticle.title')}
        </h3>

        <div>
          <span className="text-lg font-medium text-primary">{title}</span>

          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`my-12 p-6 border border-primary/20 rounded-xl bg-primary/5 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
        {t('nextArticle.title')}
      </h3>

      <div>
        <Link
          href={href}
          className="group flex items-center text-lg font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span>{title}</span>
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}

        <Link
          href={href}
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          {t('nextArticle.cta')} →
        </Link>
      </div>
    </motion.div>
  )
}

export default NextArticleBox 
