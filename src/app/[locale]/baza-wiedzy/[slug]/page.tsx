import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TableOfContents, ArticleMeta, HelpBox, SummaryBox } from '@/app/components/blog'
import { Metadata } from 'next'
import ArticleContent from './article-content'
import { KnowledgeBaseArticleProps } from '../types'
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl'
import Script from 'next/script'
import { getPostBySlug, getAllSlugs, getAllSlugsDebug } from '@/lib/sanity/queries'
import { urlFor, getLocalizedValue } from '@/lib/sanity/client'
import { DOMAIN } from '@/lib/constants'
import { serialize } from 'next-mdx-remote/serialize'
import { PortableTextBlock } from '@portabletext/react'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { getTableOfContents } from '@/utils/mdx'

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

// Helper to replace local image paths with Sanity URLs in MDX
const replaceImagePaths = (mdx: string, images: any[]): string => {
  if (!mdx || !images || images.length === 0) {
    return mdx
  }

  const imageMap = new Map(
    images.map(img => (img && img.filename && img.image ? [img.filename, urlFor(img.image).url()] : null)).filter(Boolean) as [string, string][]
  )

  if (imageMap.size === 0) {
    return mdx
  }

  // Regex to find ![alt](/local-path.png)
  const markdownImageRegex = /!\[(.*?)\]\(\/(.*?)\)/g

  return mdx.replace(markdownImageRegex, (match, altText, filename) => {
    if (imageMap.has(filename)) {
      const newUrl = imageMap.get(filename)
      return `![${altText}](${newUrl})`
    }
    return match // Return original if no mapping found
  })
}

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params

  unstable_setRequestLocale(locale)

  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Get localized title and excerpt
  const title = getLocalizedValue(post.title, locale) || ''
  const excerpt = getLocalizedValue(post.excerpt, locale) || ''
  const keywords = getLocalizedValue(post.keywords, locale) || []
  const coverImageAlt = post.coverImage?.alt
    ? getLocalizedValue(post.coverImage.alt, locale)
    : title

  // Create canonical URL for the current article's path based on slug
  const path = locale === 'pl' ? `/baza-wiedzy/${slug}` : `/knowledge-base/${slug}`
  const canonicalUrl = createCanonicalUrl(path, locale)

  // Create paths for alternates in different languages
  const enSlug = post.slug?.en?.current || slug
  const plSlug = post.slug?.pl?.current || slug

  const plPath = `/baza-wiedzy/${plSlug}`
  const enPath = `/knowledge-base/${enSlug}`

  // Create language alternates including x-default
  const languages = createLanguageAlternates(plPath, enPath, 'pl');

  // Format date for metadata
  const formattedDate = new Date(post.publishedAt).toISOString();

  // Prepare image URL for OG
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : `${DOMAIN}/images/og-image.png`

  return {
    title,
    description: excerpt,
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description: excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: formattedDate,
      modifiedTime: formattedDate,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [{
        url: imageUrl,
        alt: coverImageAlt,
      }],
    },
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Get all slugs for both languages
  const slugs = await getAllSlugs()

  // Transform into the format Next.js expects
  const paths = []

  for (const item of slugs) {
    if (item.en) {
      paths.push({ locale: 'en', slug: item.en })
    }
    if (item.pl) {
      paths.push({ locale: 'pl', slug: item.pl })
    }
  }

  return paths
}

export default async function BlogPage({ params }: PageProps) {
  const { locale, slug } = await params

  unstable_setRequestLocale(locale)

  try {
    // Get post data from Sanity
    const post = await getPostBySlug(slug, locale)

    if (!post) {
      console.log(`Post not found for slug "${slug}" and locale "${locale}"`)

      // Debug: Show available slugs
      const availableSlugs = await getAllSlugsDebug()
      console.log('Available slugs in Sanity:', availableSlugs)

      notFound()
      return null // This ensures TypeScript knows we're not continuing
    }

    // Get localized title
    const title = getLocalizedValue(post.title, locale) || ''

    // Debug: Log the post data to see what we're getting
    console.log('Post data:', {
      hasBody: !!post.body,
      hasContent: !!post.content,
      bodyType: post.body ? typeof getLocalizedValue(post.body, locale) : 'undefined',
      contentType: post.content ? typeof getLocalizedValue(post.content, locale) : 'undefined'
    })

    // Store article data for breadcrumb component
    const articleData: KnowledgeBaseArticleProps = {
      articleTitle: title,
      slug
    };

    // @ts-expect-error - we know this property is used by the layout
    params.articleData = articleData;

    // Check if we have MDX content
    let mdxContent = post.content ? getLocalizedValue(post.content, locale) : null
    let mdxSource = undefined
    let tocItems: { id: string; title: string }[] = []

    if (mdxContent) {
      // Replace image paths before further processing
      mdxContent = replaceImagePaths(mdxContent, post.contentImages || [])

      // Extract table of contents from MDX content
      tocItems = getTableOfContents(mdxContent)

      // Serialize MDX content from the content field
      mdxSource = await serialize(mdxContent, {
        parseFrontmatter: false,
        mdxOptions: {
          development: process.env.NODE_ENV === 'development',
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        }
      })
    } else {
      // Try to extract MDX from body field if it looks like MDX
      const bodyContent = post.body ? getLocalizedValue(post.body, locale) : null
      if (bodyContent && Array.isArray(bodyContent)) {
        const extractedText = extractTextFromPortableText(bodyContent)

        // Replace image paths in extracted text
        const processedText = replaceImagePaths(extractedText, post.contentImages || [])

        // Check if the extracted text looks like MDX
        if (processedText.includes('<') && processedText.includes('>') &&
          (processedText.includes('<SummaryBox') || processedText.includes('<WorthKnowing') ||
            processedText.includes('<NextArticle'))) {
          try {
            // Extract table of contents from extracted text
            tocItems = getTableOfContents(processedText)

            mdxSource = await serialize(processedText, {
              parseFrontmatter: false,
              mdxOptions: {
                development: process.env.NODE_ENV === 'development',
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              }
            })
          } catch (error) {
            console.error('Failed to serialize MDX from body field:', error)
          }
        }
      }
    }

    // If no MDX content was found, create fallback TOC items
    if (tocItems.length === 0) {
      tocItems = [
        {
          id: 'introduction',
          title: locale === 'pl' ? 'Wprowadzenie' : 'Introduction'
        }
      ]
    }

    // Get author information if available
    const authorName = post.author && typeof post.author === 'object' && 'name' in post.author
      ? post.author.name as string
      : 'NextGen Sites'

    const authorPosition = locale === 'pl' ? 'Redaktor' : 'Editor'

    // Get category if available
    const category =
      post.category &&
        typeof post.category === 'object' &&
        'title' in post.category
        ? getLocalizedValue(
          post.category.title as Record<string, string>,
          locale
        ) || ''
        : ''

    // Get summary points
    const summaryPoints = getLocalizedValue(post.summaryPoints, locale) || []

    // Format reading time
    const readingTimeText = post.readingTime
      ? (locale === 'pl' ? `Ok. ${post.readingTime} min czytania` : `Approx. ${post.readingTime} min read`)
      : (locale === 'pl' ? 'Ok. 5 min czytania' : 'Approx. 5 min read')

    // Prepare JSON-LD data for article
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "image": post.coverImage ? urlFor(post.coverImage).width(1200).url() : `${DOMAIN}/images/og-image.png`,
      "datePublished": post.publishedAt,
      "dateModified": post.publishedAt,
      "author": {
        "@type": "Person",
        "name": authorName
      },
      "publisher": {
        "@type": "Organization",
        "name": "NextGen Sites",
        "logo": {
          "@type": "ImageObject",
          "url": `${DOMAIN}/images/logo.png`
        }
      },
      "description": getLocalizedValue(post.excerpt, locale) || ''
    };

    return (
      <div className="py-4 container mx-auto" data-article-title={title}>
        <Script
          id="article-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 lg:pr-10">
            <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-p:text-base prose-headings:text-foreground">
              <ArticleMeta
                title={title}
                date={post.publishedAt}
                readingTime={readingTimeText}
                category={category}
                author={authorName}
                authorPosition={authorPosition}
                coverImage={post.coverImage ? urlFor(post.coverImage).width(800).url() : ''}
                coverImageAlt={post.coverImage?.alt ? getLocalizedValue(post.coverImage.alt, locale) || title : title}
                locale={locale}
              />

              <div className="lg:hidden mb-10">
                <TableOfContents items={tocItems} locale={locale} />
              </div>

              {summaryPoints.length > 0 && (
                <SummaryBox points={summaryPoints} locale={locale} />
              )}

              {/* Render content */}
              <ArticleContent post={post} locale={locale} mdxSource={mdxSource} />
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-20">
              {/* Table of Contents (desktop) */}
              <div className="hidden lg:block">
                <TableOfContents items={tocItems} locale={locale} />
              </div>

              {/* Simple Contact Section */}
              <HelpBox locale={locale} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
    return null
  }
}
