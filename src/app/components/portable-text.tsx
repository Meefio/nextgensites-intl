'use client';

import { PortableText as PortableTextComponent } from '@portabletext/react';
import type { PortableTextProps } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

// Define custom component renderers for Portable Text
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <div className="relative my-8 w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog post image'}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
          <code>{value.code}</code>
        </pre>
      )
    }
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;

      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }: any) => {
      return (
        <a
          href={value.slug ? `/${value.slug}` : '/'}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {children}
        </a>
      );
    }
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">{children}</blockquote>
    )
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
  }
};

export default function PortableText(props: PortableTextProps) {
  return <PortableTextComponent components={components} {...props} />;
} 
