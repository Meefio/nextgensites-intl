import { client } from './client';
import { Post, PostPreview } from './types';
import { cache } from 'react';

// GROQ queries

/**
 * Debug query to see all posts structure
 */
export const getAllPostsDebugQuery = `
  *[_type == "post"] {
    _id,
    title,
    slug,
    language,
    publishedAt,
    "hasPublishedAt": defined(publishedAt),
    "publishedAtValue": publishedAt,
    "currentTime": now()
  }
`;

/**
 * Get all posts for a specific locale - flexible version
 */
export const getAllPostsQuery = `
  *[_type == "post" && defined(publishedAt) && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    excerpt,
    language,
    author->{name, image},
    category->{_id, title}
  }
`;

/**
 * Original query with language filter
 */
export const getAllPostsQueryWithLanguage = `
  *[_type == "post" && language == $locale && defined(slug[$locale].current) && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    excerpt,
    author->{name, image},
    category->{_id, title}
  }
`;

/**
 * Get a single post by slug for a specific locale - flexible version
 */
export const getPostBySlugQuery = `
  *[_type == "post" && slug[$locale].current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    readingTime,
    summaryPoints,
    keywords,
    body,
    content,
    excerpt,
    author->{name, image, bio},
    category->{_id, title, description},
    language,
    'contentImages': contentImages[]{
      "filename": asset->originalFilename,
      "alt": alt,
      "image": asset
    }
  }
`;

/**
 * Alternative query that also searches by language if the first one fails
 */
export const getPostBySlugWithLanguageQuery = `
  *[_type == "post" && slug[$locale].current == $slug && language == $locale][0] {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    readingTime,
    summaryPoints,
    keywords,
    body,
    content,
    excerpt,
    author->{name, image, bio},
    category->{_id, title, description},
    language,
    'contentImages': contentImages[]{
      "filename": asset->originalFilename,
      "alt": alt,
      "image": asset
    }
  }
`;

/**
 * Get all post slugs for all locales
 */
export const getAllSlugsQuery = `
  *[_type == "post" && defined(publishedAt) && publishedAt < now()]{
    "slug_en": slug.en.current,
    "slug_pl": slug.pl.current,
    language
  }
`;

/**
 * Get specific post slugs for a locale
 */
export const getSlugsByLocaleQuery = `
  *[_type == "post" && defined(slug[$locale].current) && defined(publishedAt) && publishedAt < now()] {
    "slug": slug[$locale].current
  }
`;

/**
 * Debug query to see slug structure for all posts
 */
export const getAllSlugsDebugQuery = `
  *[_type == "post"] {
    _id,
    title,
    language,
    "slug_en_current": slug.en.current,
    "slug_pl_current": slug.pl.current,
    "full_slug": slug
  }
`;

// Cached fetching functions

/**
 * Debug function to see all posts
 */
export const getAllPostsDebug = cache(async () => {
  return client.fetch(getAllPostsDebugQuery);
});

/**
 * Get all posts for a specific locale - now more flexible
 */
export const getAllPosts = cache(async (locale: string): Promise<PostPreview[]> => {
  // First try to get all posts and filter on the frontend if needed
  const allPosts = await client.fetch(getAllPostsQuery);
  console.log('All posts from Sanity:', allPosts);

  // If no posts with the flexible query, return empty
  if (!allPosts || allPosts.length === 0) {
    return [];
  }

  // Filter posts that have content for the requested locale
  const filteredPosts = allPosts.filter((post: any) => {
    // Check if post has title in the requested locale
    const hasTitle = post.title && post.title[locale];
    // Check if post has slug in the requested locale
    const hasSlug = post.slug && post.slug[locale] && post.slug[locale].current;

    // We only require title and slug - excerpt can fallback to another language
    return hasTitle && hasSlug;
  });

  console.log(`Filtered posts for locale ${locale}:`, filteredPosts);
  return filteredPosts;
});

/**
 * Debug function to see all slugs
 */
export const getAllSlugsDebug = cache(async () => {
  return client.fetch(getAllSlugsDebugQuery);
});

/**
 * Get a post by slug for a specific locale - improved with fallback
 */
export const getPostBySlug = cache(async (slug: string, locale: string): Promise<Post | null> => {
  console.log(`Looking for post with slug "${slug}" and locale "${locale}"`);

  // First try the flexible query (without language constraint)
  let post = await client.fetch(getPostBySlugQuery, { slug, locale });

  if (post) {
    console.log(`Found post with flexible query:`, post._id);
    return post;
  }

  // If not found, try with language constraint
  post = await client.fetch(getPostBySlugWithLanguageQuery, { slug, locale });

  if (post) {
    console.log(`Found post with language constraint:`, post._id);
    return post;
  }

  console.log(`No post found for slug "${slug}" and locale "${locale}"`);
  return null;
});

/**
 * Get all post slugs for generating static params
 */
export const getAllSlugs = cache(async () => {
  const slugs = await client.fetch(getAllSlugsQuery);
  return slugs.map((item: any) => ({
    en: item.slug_en,
    pl: item.slug_pl,
    language: item.language
  }));
});

/**
 * Get all post slugs for a specific locale
 */
export const getSlugsByLocale = cache(async (locale: string) => {
  const slugs = await client.fetch(getSlugsByLocaleQuery, { locale });
  return slugs.map((item: any) => item.slug);
}); 
