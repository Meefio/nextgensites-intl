import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TableOfContents, ArticleMeta, HelpBox } from '@/app/components/blog'
import path from 'path'
import matter from 'gray-matter'
import { getPostBySlug, getPostSlugs, getTableOfContents } from '@/utils/mdx'
import { getCachedMdxContent, clearMdxCaches } from '@/utils/mdx-cache'
import { Metadata } from 'next'
import ArticleContent from './article-content'
import { KnowledgeBaseArticleProps } from '../types'
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl'
import Script from 'next/script'

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

  // Clear MDX caches to ensure we're using the latest data
  clearMdxCaches()

  const post = getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Use description from MDX frontmatter if available, otherwise fallback to summaryPoints
  const description = post.description || post.summaryPoints?.join(' ') || ''

  // Create canonical URL for the current article's path based on slug
  const path = locale === 'pl' ? `/baza-wiedzy/${slug}` : `/knowledge-base/${slug}`
  const canonicalUrl = createCanonicalUrl(path, locale)

  // Create paths for alternates in different languages
  const plPath = `/baza-wiedzy/${slug}`
  const enPath = `/knowledge-base/${slug}`

  // Create language alternates including x-default
  const languages = createLanguageAlternates(plPath, enPath, 'pl');

  // Format date for metadata
  const formattedDate = new Date(post.date).toISOString();

  return {
    title: post.title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: formattedDate,
      modifiedTime: formattedDate,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [{
        url: post.coverImage,
        alt: post.title,
      }],
    },
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const plSlugs = getPostSlugs('pl')
  const enSlugs = getPostSlugs('en')

  const paths = [
    ...plSlugs.map(slug => ({ locale: 'pl', slug })),
    ...enSlugs.map(slug => ({ locale: 'en', slug })),
  ]

  return paths
}

export default async function BlogPage({ params }: PageProps) {
  const { locale, slug } = await params

  unstable_setRequestLocale(locale)

  // Clear MDX caches to ensure we're using the latest data
  clearMdxCaches()

  // Get post data from MDX file
  const post = getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  // Store article data for breadcrumb component
  const articleData: KnowledgeBaseArticleProps = {
    articleTitle: post.title,
    slug
  };

  // @ts-expect-error - we know this property is used by the layout
  params.articleData = articleData;

  // Get MDX content for table of contents
  const contentPath = path.join(process.cwd(), 'src', 'content', 'blog', locale, `${slug}.mdx`)
  const fileContent = getCachedMdxContent(contentPath)

  if (!fileContent) {
    notFound()
  }

  const { content } = matter(fileContent)

  // Generate table of contents
  const tocItems = getTableOfContents(content)

  // Format date for JSON-LD (post.date is string type from PostMeta interface)
  const publishDate = new Date(post.date).toISOString();

  // Prepare JSON-LD data for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.coverImage,
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "NextGen Sites",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nextgensites.pl/images/logo.png"
      }
    },
    "description": post.description || post.summaryPoints?.join(' ') || ''
  };

  return (
    <main className="py-4 max-w-7xl mx-auto" data-article-title={post.title}>
      {/* Add JSON-LD structured data */}
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
              title={post.title}
              date={post.date}
              readingTime={post.readingTime}
              category={post.category}
              author={post.author}
              authorPosition={post.authorPosition}
              coverImage={post.coverImage}
              locale={locale}
            />

            <div className="lg:hidden mb-10">
              <TableOfContents items={tocItems} locale={locale} />
            </div>

            {/* Render MDX Content using our component */}
            <ArticleContent
              locale={locale}
              slug={slug}
              content={content}
              frontMatter={matter(fileContent).data}
            />
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
    </main>
  )
}
