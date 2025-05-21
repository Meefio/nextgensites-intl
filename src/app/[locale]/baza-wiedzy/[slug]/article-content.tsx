'use client'

import { useEffect, useState } from 'react'
import PortableText from '@/app/components/portable-text'
import { getPostBySlug } from '@/lib/sanity/queries'
import { getLocalizedValue } from '@/lib/sanity/client'
import { Post } from '@/lib/sanity/types'
import { Skeleton } from '@/app/components/ui/skeleton'

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
