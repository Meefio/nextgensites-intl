'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag } from 'lucide-react'
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
      </motion.div>

      {/* Author information */}
      <motion.div
        className="mt-8 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
            {author.split(' ').map(name => name[0]).join('')}
          </div>
        </div>
        <div className="text-left">
          <p className="font-semibold">
            <span className="sr-only">{t('meta.author')}</span>
            {author}
          </p>
          {authorPosition && (
            <p className="text-sm text-muted-foreground">{authorPosition}</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ArticleMeta 
