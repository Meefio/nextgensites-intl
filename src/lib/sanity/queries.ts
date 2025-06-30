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
 * Get all posts for a specific locale
 */
export const getAllPostsQuery = `
  *[_type == "post" && 
    defined(publishedAt) && 
    publishedAt < now() &&
    defined(title[$locale]) &&
    defined(slug[$locale].current)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    readingTime,
    excerpt,
    language,
    author->{name, image},
    category->{_id, title}
  }
`;

/**
 * Get a single post by slug for a specific locale
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

/**
 * Get featured posts for homepage
 */
export const getFeaturedPostsQuery = `
  *[_type == "post" && featured == true && status == "published" && defined(publishedAt) && publishedAt < now()] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    readingTime,
    excerpt,
    language,
    author->{name, image},
    category->{_id, title}
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
 * Get all posts for a specific locale
 */
export const getAllPosts = cache(async (locale: string): Promise<PostPreview[]> => {
  try {
    const posts = await client.fetch(getAllPostsQuery, { locale });
    return posts || [];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
});

/**
 * Debug function to see all slugs
 */
export const getAllSlugsDebug = cache(async () => {
  return client.fetch(getAllSlugsDebugQuery);
});

/**
 * Get a post by slug for a specific locale
 */
export const getPostBySlug = cache(async (slug: string, locale: string): Promise<Post | null> => {
  try {
    const post = await client.fetch(getPostBySlugQuery, { slug, locale });

    if (!post) {
      console.warn(`No post found for slug "${slug}" and locale "${locale}"`);
      return null;
    }

    return post;
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}" for locale "${locale}":`, error);
    return null;
  }
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
  try {
    const slugs = await client.fetch(getSlugsByLocaleQuery, { locale });
    return slugs.map((item: any) => item.slug);
  } catch (error) {
    console.error(`Error fetching slugs for locale "${locale}":`, error);
    return [];
  }
});

/**
 * Get featured posts for homepage
 */
export const getFeaturedPosts = cache(async (locale: string): Promise<PostPreview[]> => {
  try {
    const featuredPosts = await client.fetch(getFeaturedPostsQuery);

    if (!featuredPosts || featuredPosts.length === 0) {
      const latestPosts = await getAllPosts(locale);
      return latestPosts.slice(0, 3);
    }

    const filteredPosts = featuredPosts.filter((post: any) => {
      const hasTitle = post.title && post.title[locale];
      const hasSlug = post.slug && post.slug[locale] && post.slug[locale].current;
      return hasTitle && hasSlug;
    });

    return filteredPosts;
  } catch (error) {
    console.error(`Error fetching featured posts for locale "${locale}":`, error);
    return [];
  }
}); 
