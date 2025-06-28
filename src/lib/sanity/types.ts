import type { PortableTextBlock } from '@portabletext/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Type for a localized field with values for different languages
export type LocalizedField<T> = {
  en?: T;
  pl?: T;
  [key: string]: T | undefined;
};

// Type for a slug field
export type SanitySlug = {
  _type: 'slug';
  current: string;
};

// Type for a reference to another document
export type SanityReference = {
  _ref: string;
  _type: 'reference';
};

// Type for a category
export type Category = {
  _id: string;
  _type: 'category';
  title: LocalizedField<string>;
  description?: LocalizedField<string>;
};

// Type for an author
export type Author = {
  _id: string;
  _type: 'author';
  name: string;
  image?: SanityImageSource;
  bio?: PortableTextBlock[];
};

// Type for a post document from Sanity
export type Post = {
  _id: string;
  _type: 'post';
  language: string;
  title: LocalizedField<string>;
  slug: LocalizedField<SanitySlug>;
  coverImage?: SanityImageSource & { alt?: LocalizedField<string> };
  categories?: SanityReference[];
  author?: SanityReference;
  publishedAt: string;
  readingTime?: number;
  excerpt: LocalizedField<string>;
  summaryPoints?: LocalizedField<string[]>;
  keywords?: LocalizedField<string[]>;
  body?: LocalizedField<PortableTextBlock[]>;
  content?: LocalizedField<string>;
  contentImages?: ContentImage[];
};

// Type for a simplified post preview
export type PostPreview = {
  _id: string;
  title: LocalizedField<string>;
  slug: LocalizedField<SanitySlug> | { current: string };
  coverImage?: SanityImageSource;
  publishedAt: string;
  excerpt: LocalizedField<string>;
  author?: Author;
  categories?: Category[];
};

export type ContentImage = {
  _type: 'contentImage';
  filename?: string;
  image?: SanityImageSource & {
    alt?: string;
    caption?: string;
  };
}; 
