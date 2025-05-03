'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ComponentProps } from 'react'

interface NextArticleBoxProps {
  title: string
  slug?: string
  description?: string
  className?: string
  locale?: string
}

// Utility function to convert a string to a path parameter
const asPathname = (path: string) => {
  // This makes TypeScript treat the string as a valid pathname
  return path as ComponentProps<typeof Link>['href'];
};

export const NextArticleBox = ({ title, slug, description, locale = 'pl', className = '' }: NextArticleBoxProps) => {
  const t = useTranslations('BlogComponents')

  // Check if slug is valid (not undefined, null, empty or just whitespace)
  const isValidSlug = slug && slug.trim().length > 0

  // Construct the href based on locale and slug, or default to homepage if no valid slug
  const hrefPath = isValidSlug
    ? `/${locale === 'en' ? 'en/' : ''}baza-wiedzy/${slug}`
    : '/' // Default to homepage when no valid slug is available

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
      className={`my-12 p-6 border border-primary/20 rounded-xl bg-primary/[0.01] shadow-sm ${className}`}
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
          href={asPathname(hrefPath)}
          className="group flex items-center text-lg font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span>{title}</span>
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {description && (
          <p className="mt-2">{description}</p>
        )}

        <Link
          href={asPathname(hrefPath)}
          className="mt-4 inline-block text-sm font-medium text-primary"
        >
          {t('nextArticle.cta')} →
        </Link>
      </div>
    </motion.div>
  )
}

export default NextArticleBox 
