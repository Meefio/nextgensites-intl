import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { KNOWLEDGE_BASE_PATHS } from '@/lib/constants'

/**
 * API route for revalidating blog pages
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  // Check the secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid revalidation secret' }, { status: 401 })
  }

  // Check if path is provided
  if (!path) {
    return Response.json({ message: 'Path parameter is missing' }, { status: 400 })
  }

  try {
    // Revalidate the specific path
    revalidatePath(path)

    // If it's a specific blog post, also revalidate the index pages
    if (path.includes(KNOWLEDGE_BASE_PATHS.PL) || path.includes(KNOWLEDGE_BASE_PATHS.EN)) {
      // Revalidate both language versions of the blog index
      revalidatePath(KNOWLEDGE_BASE_PATHS.PL)
      revalidatePath(`/en${KNOWLEDGE_BASE_PATHS.EN}`)
    }

    return Response.json({
      revalidated: true,
      message: `Path ${path} revalidated successfully`,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return Response.json(
      { message: `Error revalidating: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

/**
 * You can also trigger revalidation via POST request from Sanity webhooks
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')

    // Check the secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ message: 'Invalid revalidation secret' }, { status: 401 })
    }

    // Parse the webhook payload from Sanity
    const payload = await request.json()

    // Check if it's a post document
    if (payload?.result?._type === 'post') {
      // Get the post's language
      const language = payload.result.language

      // Determine which path to revalidate based on language
      const basePath = language === 'pl' ? KNOWLEDGE_BASE_PATHS.PL : `/en${KNOWLEDGE_BASE_PATHS.EN}`

      // Get the slug if available
      let slug = ''
      if (payload.result.slug && payload.result.slug[language]?.current) {
        slug = payload.result.slug[language].current
      }

      // Revalidate specific post if slug is available
      if (slug) {
        revalidatePath(`${basePath}/${slug}`)
      }

      // Always revalidate the index pages
      revalidatePath(KNOWLEDGE_BASE_PATHS.PL)
      revalidatePath(`/en${KNOWLEDGE_BASE_PATHS.EN}`)

      return Response.json({
        revalidated: true,
        message: `Blog content revalidated successfully`,
        now: Date.now(),
      })
    }

    return Response.json({
      message: 'No matching document type for revalidation',
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return Response.json(
      { message: `Error revalidating: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
} 
