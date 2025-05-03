import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Define types for blog post metadata
export interface PostMeta {
  title: string
  slug: string
  date: string
  readingTime: string
  author: string
  authorPosition?: string
  category: string
  coverImage: string
  summaryPoints?: string[]
  worthKnowing?: string
  locale: string
}

// Get absolute path to content directory
const getContentDirectory = (locale: string) => {
  return path.join(process.cwd(), 'src', 'content', 'blog', locale)
}

// Get post slugs for a specific locale
export const getPostSlugs = (locale: string): string[] => {
  try {
    const postsDirectory = getContentDirectory(locale)
    return fs.readdirSync(postsDirectory)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error(`Error getting post slugs for locale ${locale}:`, error)
    return []
  }
}

// Get post metadata for a specific slug and locale
export const getPostBySlug = (slug: string, locale: string): PostMeta | null => {
  try {
    const postsDirectory = getContentDirectory(locale)
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      console.warn(`Post not found: ${fullPath}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      ...data,
      slug,
      locale,
    } as PostMeta
  } catch (error) {
    console.error(`Error getting post by slug ${slug} for locale ${locale}:`, error)
    return null
  }
}

// Get all posts for a specific locale
export const getAllPosts = (locale: string): PostMeta[] => {
  const slugs = getPostSlugs(locale)

  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is PostMeta => post !== null)
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())

  return posts
}

// Get table of contents items from MDX content
export const getTableOfContents = (content: string) => {
  // Match all headings with level 2 (##)
  const headingRegex = /^##\s+(.*?)$/gm
  const matches = [...content.matchAll(headingRegex)]

  return matches.map((match) => {
    const title = match[1].trim()

    // Create a slugified version of the heading that preserves special characters
    // but is still URL-safe for Polish (and other non-ASCII) characters
    const id = title
      .toLowerCase()
      .replace(/[\s_]+/g, '-')  // Replace spaces and underscores with a single hyphen
      .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, '')  // Remove leading and trailing hyphens
    // We no longer strip out non-ASCII characters like ł, ś, ć, etc.

    return { id, title }
  })
}

// Get related posts based on category
export const getRelatedPosts = (currentSlug: string, locale: string, limit = 3): PostMeta[] => {
  const currentPost = getPostBySlug(currentSlug, locale)
  if (!currentPost) return []

  const allPosts = getAllPosts(locale)

  // Filter out current post and posts with different category, then limit
  return allPosts
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
    .slice(0, limit)
}

// Get all categories with post counts
export const getCategories = (locale: string) => {
  const posts = getAllPosts(locale)
  const categories = posts.reduce((acc, post) => {
    const { category } = post
    if (!acc[category]) {
      acc[category] = 0
    }
    acc[category]++
    return acc
  }, {} as Record<string, number>)

  return Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
} 
