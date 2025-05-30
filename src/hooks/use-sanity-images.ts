'use client'

import { useEffect, useState } from 'react'
import { processImageReferences } from '@/utils/sanity-images'

interface UseSanityImagesReturn {
  processedContent: string
  isLoading: boolean
  error: string | null
}

export function useSanityImages(mdxContent: string): UseSanityImagesReturn {
  const [processedContent, setProcessedContent] = useState(mdxContent)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function processImages() {
      if (!mdxContent) {
        setProcessedContent('')
        return
      }

      // Only process if content contains image references
      if (!mdxContent.includes('/images/blog/')) {
        setProcessedContent(mdxContent)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const processed = await processImageReferences(mdxContent)
        setProcessedContent(processed)
      } catch (err) {
        console.error('Error processing images:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setProcessedContent(mdxContent) // Fallback to original content
      } finally {
        setIsLoading(false)
      }
    }

    processImages()
  }, [mdxContent])

  return { processedContent, isLoading, error }
} 
