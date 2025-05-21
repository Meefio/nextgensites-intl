import { client } from './client';
import { Post, PostPreview } from './types';
import { cache } from 'react';

// GROQ queries

/**
 * Get all posts for a specific locale
 */
export const getAllPostsQuery = `
  *[_type == "post" && language == $locale && defined(slug[$locale].current) && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    author->{name, image},
    categories[]->{_id, title}
  }
`;

/**
 * Get a single post by slug for a specific locale
 */
export const getPostBySlugQuery = `
  *[_type == "post" && slug[$locale].current == $slug && language == $locale][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    excerpt,
    author->{name, image, bio},
    categories[]->{_id, title, description}
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

// Cached fetching functions

/**
 * Get all posts for a specific locale
 */
export const getAllPosts = cache(async (locale: string): Promise<PostPreview[]> => {
  return client.fetch(getAllPostsQuery, { locale });
});

/**
 * Get a post by slug for a specific locale
 */
export const getPostBySlug = cache(async (slug: string, locale: string): Promise<Post | null> => {
  return client.fetch(getPostBySlugQuery, { slug, locale });
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
