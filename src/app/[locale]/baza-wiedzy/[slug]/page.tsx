import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { TableOfContents, ArticleMeta } from '@/app/components/blog'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getPostBySlug, getPostSlugs, getTableOfContents } from '@/utils/mdx'
import { Metadata } from 'next'
import ArticleContent from './article-content'

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

  const post = getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.summaryPoints?.join(' ') || '',
    openGraph: {
      title: post.title,
      description: post.summaryPoints?.join(' ') || '',
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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

  // Get post data from MDX file
  const post = getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  // Get MDX content for table of contents
  const contentPath = path.join(process.cwd(), 'src', 'content', 'blog', locale, `${slug}.mdx`)

  if (!fs.existsSync(contentPath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(contentPath, 'utf8')
  const { content } = matter(fileContent)

  // Generate table of contents
  const tocItems = getTableOfContents(content)

  return (
    <main className="container py-16 max-w-7xl">
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
            <ArticleContent locale={locale} slug={slug} />
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-24">
            {/* Table of Contents (desktop) */}
            <div className="hidden lg:block">
              <TableOfContents items={tocItems} locale={locale} />
            </div>

            {/* Simple Contact Section */}
            <div className="p-6 border rounded-xl bg-muted/20">
              <h3 className="font-semibold text-lg mb-3">
                {locale === 'pl' ? 'Potrzebujesz pomocy?' : 'Need help?'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {locale === 'pl'
                  ? 'Skontaktuj się z nami, aby uzyskać bezpłatną konsultację dotyczącą Twojego projektu.'
                  : 'Contact us for a free consultation about your project.'
                }
              </p>
              <a
                href={locale === 'pl' ? '/#contact' : '/en/#contact'}
                className="block w-full bg-primary text-primary-foreground text-center py-2 px-4 rounded-md hover:bg-primary/90 transition"
              >
                {locale === 'pl' ? 'Skontaktuj się' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
