/**
 * MDX Caching Utilities
 * 
 * This file contains caching mechanisms for MDX operations to improve
 * article loading performance by reducing filesystem operations.
 */

import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// In-memory cache structure
type CacheRecord<T> = {
  value: T;
  timestamp: number;
};

// Cache expiration time in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// In-memory caches
const mdxContentCache = new Map<string, CacheRecord<string>>();
const mdxDataCache = new Map<string, CacheRecord<any>>();
const mdxSlugCache = new Map<string, CacheRecord<string[]>>();

/**
 * Gets MDX file content with caching
 */
export function getCachedMdxContent(filePath: string): string {
  const cacheKey = filePath;
  const now = Date.now();

  // Check if we have a valid cache entry
  const cachedRecord = mdxContentCache.get(cacheKey);
  if (cachedRecord && now - cachedRecord.timestamp < CACHE_TTL) {
    return cachedRecord.value;
  }

  // Read from filesystem if not cached or cache expired
  if (!fs.existsSync(filePath)) {
    return '';
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Update cache
  mdxContentCache.set(cacheKey, {
    value: content,
    timestamp: now
  });

  return content;
}

/**
 * Gets parsed MDX data with caching
 */
export function getCachedMdxData(slug: string, locale: string) {
  const cacheKey = `${locale}:${slug}`;
  const now = Date.now();

  // Check if we have a valid cache entry
  const cachedRecord = mdxDataCache.get(cacheKey);
  if (cachedRecord && now - cachedRecord.timestamp < CACHE_TTL) {
    return cachedRecord.value;
  }

  // Get the file path
  const filePath = path.join(process.cwd(), 'src', 'content', 'blog', locale, `${slug}.mdx`);

  // Parse MDX if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = getCachedMdxContent(filePath);
  const { data, content } = matter(fileContent);

  const result = {
    ...data,
    slug,
    content
  };

  // Update cache
  mdxDataCache.set(cacheKey, {
    value: result,
    timestamp: now
  });

  return result;
}

/**
 * Gets all available slugs with caching
 */
export function getCachedSlugs(locale: string): string[] {
  const cacheKey = locale;
  const now = Date.now();

  // Check if we have a valid cache entry
  const cachedRecord = mdxSlugCache.get(cacheKey);
  if (cachedRecord && now - cachedRecord.timestamp < CACHE_TTL) {
    return cachedRecord.value;
  }

  // Get directory path
  const directory = path.join(process.cwd(), 'src', 'content', 'blog', locale);

  // Return empty array if directory doesn't exist
  if (!fs.existsSync(directory)) {
    return [];
  }

  // Get all MDX files and extract slugs
  const slugs = fs
    .readdirSync(directory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));

  // Update cache
  mdxSlugCache.set(cacheKey, {
    value: slugs,
    timestamp: now
  });

  return slugs;
}

/**
 * Clear all caches - used when content is updated
 */
export function clearMdxCaches() {
  mdxContentCache.clear();
  mdxDataCache.clear();
  mdxSlugCache.clear();
} 
