import 'server-only';
import { getCachedMdxData, getCachedSlugs } from './mdx-cache'

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
  description?: string
  summaryPoints?: string[]
  worthKnowing?: string
  locale: string
}


// Get post slugs for a specific locale - using cache
export const getPostSlugs = (locale: string): string[] => {
  try {
    return getCachedSlugs(locale)
  } catch (error) {
    console.error(`Error getting post slugs for locale ${locale}:`, error)
    return []
  }
}

// Get post metadata for a specific slug and locale - using cache
export const getPostBySlug = (slug: string, locale: string): PostMeta | null => {
  try {
    const data = getCachedMdxData(slug, locale)

    if (!data) {
      console.warn(`Post not found: ${slug} (${locale})`)
      return null
    }

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

    // Use similar algorithm to github-slugger (which rehype-slug uses)
    // 1. Convert to lowercase
    // 2. Use Unicode normalization to handle diacritical marks
    // 3. Remove non-alphanumeric characters
    // 4. Replace spaces with hyphens and handle consecutive hyphens

    const id = title
      .toLowerCase()
      // Unicode normalization (NFD) separates diacritical marks from base characters
      .normalize('NFD')
      // Remove diacritical marks after normalization
      .replace(/[\u0300-\u036f]/g, '')
      // Remove anything that is not alphanumeric, space, or hyphen
      .replace(/[^\w\s-]/g, '')
      // Replace spaces and repeated hyphens with a single dash
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      // Remove leading/trailing dashes
      .replace(/^-+|-+$/g, '')

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
