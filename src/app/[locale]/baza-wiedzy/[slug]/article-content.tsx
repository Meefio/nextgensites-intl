import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/utils/mdx'
import { getCachedMdxContent } from '@/utils/mdx-cache'
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

    // Get MDX content with caching
    const contentPath = path.join(process.cwd(), 'src', 'content', 'blog', locale, `${slug}.mdx`)
    const fileContent = getCachedMdxContent(contentPath)

    if (!fileContent) {
      console.error(`MDX file not found at path: ${contentPath}`)
      notFound()
    }

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
          SummaryBox: (props) => {
            // Tylko użyj frontMatter.summaryPoints jako fallback, gdy brak children
            // Sprawdzamy czy props.children istnieje i czy nie jest puste
            const useChildrenContent = props.children !== undefined && props.children !== null;

            return (
              <MDXComponents.SummaryBox
                {...props}
                locale={locale}
                points={useChildrenContent ? undefined : (frontMatter.summaryPoints || [])}
              />
            );
          },
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
