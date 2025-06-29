'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, User } from 'lucide-react'
import Image from 'next/image'

interface ArticleMetaProps {
  title: string
  date: string
  readingTime: string
  category: string
  author: string
  authorPosition?: string
  coverImage: string
  coverImageAlt: string
  locale: 'en' | 'pl'
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
  coverImageAlt,
  locale,
  className = ''
}: ArticleMetaProps) => {
  // Format date to be more readable - like "20 sie 2018"
  const formatDate = (dateString: string): string => {
    try {
      // Ensure we have a valid date string
      if (!dateString) return ''

      const date = new Date(dateString)

      // Check if date is valid
      if (isNaN(date.getTime())) return dateString

      // Format based on locale
      if (locale === 'pl') {
        // Polish format: day month year (abbreviated month)
        const months = [
          'sty',
          'lut',
          'mar',
          'kwi',
          'maj',
          'cze',
          'lip',
          'sie',
          'wrz',
          'paź',
          'lis',
          'gru'
        ]
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `${day} ${month} ${year}`
      } else {
        // English format: month day, year (abbreviated month)
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `${month} ${day}, ${year}`
      }
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString // Return original string if formatting fails
    }
  }

  return (
    <div className={`mb-12 max-w-4xl mx-auto text-center ${className}`}>
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h1>

      {/* Featured image with animation */}
      {coverImage && (
        <motion.div
          className="my-8 rounded-xl overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={coverImage}
              alt={coverImageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      )}

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
            <span className="sr-only">{locale === 'pl' ? 'Opublikowano' : 'Posted on'}</span>
            {formatDate(date)}
          </span>
        </div>
        <div className="flex items-center px-4 py-2 bg-card border rounded-full shadow-sm">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm font-medium">
            <span className="sr-only">{locale === 'pl' ? 'Czas czytania' : 'Reading time'}</span>
            {readingTime}
          </span>
        </div>
        <div className="flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full shadow-sm">
          <Tag className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">
            <span className="sr-only">{locale === 'pl' ? 'Kategoria' : 'Category'}</span>
            {category}
          </span>
        </div>
        <div className="flex items-center px-4 py-2 bg-card border rounded-full shadow-sm">
          <User className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm font-medium">
            <span className="sr-only">{locale === 'pl' ? 'Autor' : 'Author'}</span>
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
