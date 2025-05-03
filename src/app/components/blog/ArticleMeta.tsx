'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, User } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface ArticleMetaProps {
  title: string
  date: string
  readingTime: string
  category: string
  author: string
  authorPosition?: string
  coverImage: string
  locale?: string
  className?: string
}

export const ArticleMeta = ({
  title,
  date,
  readingTime,
  category,
  author,
  authorPosition,
  coverImage,
  locale,
  className = ''
}: ArticleMetaProps) => {
  const t = useTranslations('BlogComponents')

  return (
    <div className={`mb-12 max-w-4xl mx-auto text-center ${className}`}>
      <div className="mb-4 inline-flex items-center px-3 py-1 bg-muted text-primary rounded-full text-sm font-medium">
        {locale === 'pl' ? 'ARTYKUŁ' : 'ARTICLE'}
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h1>

      {/* Featured image with animation */}
      <motion.div
        className="my-8 rounded-xl overflow-hidden shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Article metadata with improved visual design */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center px-4 py-2 bg-card border rounded-full shadow-sm">
          <Calendar className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm font-medium">
            <span className="sr-only">{t('meta.postedOn')}</span>
            {date}
          </span>
        </div>
        <div className="flex items-center px-4 py-2 bg-card border rounded-full shadow-sm">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm font-medium">
            <span className="sr-only">{t('meta.readingTime')}</span>
            {readingTime}
          </span>
        </div>
        <div className="flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full shadow-sm">
          <Tag className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">
            <span className="sr-only">{t('meta.category')}</span>
            {category}
          </span>
        </div>
        <div className="flex items-center px-4 py-2 bg-card border rounded-full shadow-sm">
          <User className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm font-medium">
            <span className="sr-only">{t('meta.author')}</span>
            {author}
            {authorPosition && (
              <span className="text-xs text-muted-foreground ml-1">
                • {authorPosition}
              </span>
            )}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default ArticleMeta 
