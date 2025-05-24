import { MDXRemote } from 'next-mdx-remote/rsc'
import { createMDXComponents } from '@/app/components/blog/MDXComponents'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface ArticleContentProps {
  locale: string
  slug: string
  content: string
  frontMatter: any
}

export const ArticleContent = ({ locale, slug, content, frontMatter }: ArticleContentProps) => {
  try {
    if (!content || content.trim() === '') {
      console.error(`Empty content for post: ${slug}`)
      return <div>Content not available</div>
    }

    // Create MDX components with locale context
    const MDXComponents = createMDXComponents(locale);

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
