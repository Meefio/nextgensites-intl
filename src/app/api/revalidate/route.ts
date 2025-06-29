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
    const body = payload.body || payload; // Accommodate different webhook structures

    // Check if it's a post document
    if (body?.result?._type === 'post' || body?._type === 'post') {
      const post = body.result || body;

      // Always revalidate the main knowledge base pages
      revalidatePath(KNOWLEDGE_BASE_PATHS.PL);
      revalidatePath(KNOWLEDGE_BASE_PATHS.EN);
      console.log('Revalidated main knowledge base pages');

      // Revalidate individual post pages if slugs are available
      const slug_pl = post.slug?.pl?.current;
      const slug_en = post.slug?.en?.current;

      if (slug_pl) {
        const path_pl = `${KNOWLEDGE_BASE_PATHS.PL}/${slug_pl}`;
        revalidatePath(path_pl);
        console.log(`Revalidated Polish post: ${path_pl}`);
      }

      if (slug_en) {
        const path_en = `${KNOWLEDGE_BASE_PATHS.EN}/${slug_en}`;
        revalidatePath(path_en);
        console.log(`Revalidated English post: ${path_en}`);
      }

      return Response.json({
        revalidated: true,
        message: `Blog content revalidated successfully for post ID: ${post._id}`,
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
