'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import PortableText from '@/app/components/portable-text'
import { getLocalizedValue } from '@/lib/sanity/client'
import { Post } from '@/lib/sanity/types'
import { MDXComponents } from '@/app/components/blog/MDXComponents'
import { PortableTextBlock } from '@portabletext/react'

// Helper function to extract plain text from PortableText blocks
function extractTextFromPortableText(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('')
      }
      return ''
    })
    .join('\n\n')
}

// Helper to check if text looks like MDX
function looksLikeMDX(text: string): boolean {
  // Check for common MDX patterns
  return text.includes('<') && text.includes('>') &&
    (text.includes('<SummaryBox') || text.includes('<WorthKnowing') ||
      text.includes('<NextArticle') || text.includes('import '))
}

type ArticleContentProps = {
  locale: string
  post: Post
  mdxSource?: MDXRemoteSerializeResult
}

export default function ArticleContent({ locale, post, mdxSource }: ArticleContentProps) {
  // Check if we have MDX content
  const mdxContent = post.mdxContent ? getLocalizedValue(post.mdxContent, locale) : null

  // If we have pre-compiled MDX source, use it
  if (mdxSource) {
    return <MDXRemote {...mdxSource} components={MDXComponents} />
  }

  // Check if body contains MDX-like content
  const portableTextContent = post ? getLocalizedValue(post.body, locale) : null
  if (portableTextContent && Array.isArray(portableTextContent)) {
    const extractedText = extractTextFromPortableText(portableTextContent)

    // If the extracted text looks like MDX, show a message
    if (looksLikeMDX(extractedText)) {
      return (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 my-6">
          <h3 className="text-lg font-semibold mb-2">Content Migration Needed</h3>
          <p className="mb-4">This article contains MDX content that needs to be migrated to the new MDX Content field in Sanity Studio.</p>
          <p className="text-sm text-muted-foreground">To fix this:</p>
          <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2">
            <li>Go to Sanity Studio</li>
            <li>Copy the content from the body field</li>
            <li>Paste it into the new MDX Content field</li>
            <li>Publish the changes</li>
          </ol>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium">Show raw content</summary>
            <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
              {extractedText}
            </pre>
          </details>
        </div>
      )
    }
  }

  if (!post || (!portableTextContent && !mdxContent)) {
    return <div>Article content not available</div>
  }

  return <PortableText value={portableTextContent || []} />
} 
