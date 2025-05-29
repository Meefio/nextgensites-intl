import { NextRequest, NextResponse } from 'next/server';
import { getPostSlugsForAllLocales } from '@/i18n/blog-localization';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const locale = searchParams.get('locale');

    if (!slug || !locale) {
      return NextResponse.json(
        { error: 'Missing required parameters: slug and locale' },
        { status: 400 }
      );
    }

    // Get slug mappings from Sanity
    const slugMappings = await getPostSlugsForAllLocales(slug, locale);

    return NextResponse.json(
      { slugs: slugMappings },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=60', // Cache for 5 minutes
        }
      }
    );
  } catch (error) {
    console.error('Error in post-slugs API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
