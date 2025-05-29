import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TableOfContents, ArticleMeta, HelpBox } from '@/app/components/blog'
import { Metadata } from 'next'
import ArticleContent from './article-content'
import { KnowledgeBaseArticleProps } from '../types'
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl'
import Script from 'next/script'
import { getPostBySlug, getAllSlugs, getAllSlugsDebug } from '@/lib/sanity/queries'
import { urlFor, getLocalizedValue } from '@/lib/sanity/client'
import { formatDateForLocale } from '@/utils/date-utils'
import { DOMAIN } from '@/lib/constants'

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
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${DOMAIN}/images/og-image.png`

  return {
    title,
    description: excerpt,
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
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [{
        url: imageUrl,
        alt: title,
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

    // Store article data for breadcrumb component
    const articleData: KnowledgeBaseArticleProps = {
      articleTitle: title,
      slug
    };

    // @ts-expect-error - we know this property is used by the layout
    params.articleData = articleData;

    // For now, we'll use a simplified table of contents
    const tocItems = [
      {
        id: 'introduction',
        title: locale === 'pl' ? 'Wprowadzenie' : 'Introduction'
      }
    ]

    // Format date for the view
    const publishDate = formatDateForLocale(post.publishedAt, locale)

    // Get author information if available
    const authorName = post.author && typeof post.author === 'object' && 'name' in post.author
      ? post.author.name as string
      : 'NextGen Sites'

    const authorPosition = locale === 'pl' ? 'Redaktor' : 'Editor'

    // Get category if available
    const category = post.categories && post.categories.length > 0
      ? (typeof post.categories[0] === 'object' && 'title' in post.categories[0]
        ? getLocalizedValue((post.categories[0].title as Record<string, string>), locale) || ''
        : '')
      : ''

    // Prepare JSON-LD data for article
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "image": post.mainImage ? urlFor(post.mainImage).width(1200).url() : `${DOMAIN}/images/og-image.png`,
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
      <div className="py-4 max-w-7xl mx-auto" data-article-title={title}>
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
                date={publishDate}
                readingTime={locale === 'pl' ? 'Ok. 5 min czytania' : 'Approx. 5 min read'}
                category={category}
                author={authorName}
                authorPosition={authorPosition}
                coverImage={post.mainImage ? urlFor(post.mainImage).width(800).url() : ''}
                locale={locale}
              />

              <div className="lg:hidden mb-10">
                <TableOfContents items={tocItems} locale={locale} />
              </div>

              {/* Render content */}
              <ArticleContent post={post} locale={locale} />
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-6">
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
