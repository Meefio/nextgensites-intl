import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

/**
 * Get image URL from Sanity by filename reference
 */
export async function getSanityImageByFilename(filename: string): Promise<string | null> {
  try {
    const query = groq`*[_type == "contentImage" && filename == $filename][0]{
      "imageUrl": image.asset->url,
      "alt": image.alt
    }`

    const result = await client.fetch(query, { filename })
    return result?.imageUrl || null
  } catch (error) {
    console.error(`Error fetching image for filename ${filename}:`, error)
    return null
  }
}

/**
 * Get all content images for MDX processing
 */
export async function getAllContentImages() {
  try {
    const query = groq`*[_type == "contentImage"]{
      filename,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      "caption": image.caption,
      title,
      category,
      tags
    }`

    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching content images:', error)
    return []
  }
}

/**
 * Replace image references in MDX content with Sanity URLs
 */
export function replaceImageReferences(content: string, imageMap: Record<string, string>): string {
  return content.replace(
    /!\[([^\]]*)\]\(\/images\/blog\/([^)]+)\)/g,
    (match, alt, filename) => {
      const sanityUrl = imageMap[filename]
      if (sanityUrl) {
        return `![${alt}](${sanityUrl})`
      }
      return match // Return original if no Sanity image found
    }
  )
}

/**
 * Create image map for efficient lookup
 */
export function createImageMap(images: any[]): Record<string, string> {
  return images.reduce((map, image) => {
    if (image.filename && image.imageUrl) {
      map[image.filename] = image.imageUrl
    }
    return map
  }, {} as Record<string, string>)
}

/**
 * Process MDX content to replace image references with Sanity URLs
 */
export async function processImageReferences(mdxContent: string): Promise<string> {
  try {
    const images = await getAllContentImages()
    const imageMap = createImageMap(images)
    return replaceImageReferences(mdxContent, imageMap)
  } catch (error) {
    console.error('Error processing image references:', error)
    return mdxContent // Return original content on error
  }
} 
