import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/utils/mdx'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXComponents } from '@/app/components/blog/MDXComponents'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface ArticleContentProps {
  locale: string
  slug: string
}

export const ArticleContent = ({ locale, slug }: ArticleContentProps) => {
  try {
    // Get post data from MDX file
    const post = getPostBySlug(slug, locale)

    if (!post) {
      console.error(`Post not found for slug: ${slug} and locale: ${locale}`)
      notFound()
    }

    // Get MDX content
    const contentPath = path.join(process.cwd(), 'src', 'content', 'blog', locale, `${slug}.mdx`)

    if (!fs.existsSync(contentPath)) {
      console.error(`MDX file not found at path: ${contentPath}`)
      notFound()
    }

    const fileContent = fs.readFileSync(contentPath, 'utf8')
    const { content, data: frontMatter } = matter(fileContent)

    if (!content || content.trim() === '') {
      console.error(`Empty content for post: ${slug}`)
      return <div>Content not available</div>
    }

    return (
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
            ],
            remarkPlugins: [remarkGfm],
          },
          parseFrontmatter: true,
        }}
        components={{
          ...MDXComponents,
          SummaryBox: (props) => (
            <MDXComponents.SummaryBox
              {...props}
              locale={locale}
              points={frontMatter.summaryPoints || []}
            />
          ),
          WorthKnowingBox: MDXComponents.WorthKnowingBox,
          NextArticleBox: (props) => (
            <MDXComponents.NextArticleBox {...props} locale={locale} />
          )
        }}
      />
    )
  } catch (error) {
    console.error(`Error rendering MDX content: ${error}`)
    return <div>Error loading content</div>
  }
}

export default ArticleContent 
