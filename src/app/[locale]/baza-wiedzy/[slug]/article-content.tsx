'use client'

import PortableText from '@/app/components/portable-text'
import { getLocalizedValue } from '@/lib/sanity/client'
import { Post } from '@/lib/sanity/types'

type ArticleContentProps = {
  locale: string
  post: Post
}

export default function ArticleContent({ locale, post }: ArticleContentProps) {
  // Get the localized content for the current locale
  const content = post ? getLocalizedValue(post.body, locale) : null

  if (!post || !content) {
    return <div>Article content not available</div>
  }

  return <PortableText value={content} />
} 
