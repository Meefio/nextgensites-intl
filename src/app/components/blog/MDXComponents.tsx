import { Link as NextIntlLink } from '@/i18n/routing'
import { SummaryBox } from './SummaryBox'
import { WorthKnowingBox } from './WorthKnowingBox'
import { NextArticleBox } from './NextArticleBox'
import { useLocale } from 'next-intl'
import { ComponentProps } from 'react'

// Helper to type href correctly
const asPathname = (path: string) => {
  return path as ComponentProps<typeof NextIntlLink>['href'];
};

// Create a proper React component for anchor tags
const CustomLink = (props: any) => {
  const locale = useLocale();
  let href = props.href || '';

  // Check if this is an internal link to a knowledge base article
  if (href.startsWith('/baza-wiedzy/') || href.startsWith('/knowledge-base/')) {
    const slug = href.split('/').pop();
    href = `/${locale === 'en' ? 'en/knowledge-base' : 'baza-wiedzy'}/${slug}`;
  }

  return (
    <NextIntlLink
      href={asPathname(href)}
      className="text-primary hover:underline font-medium"
      {...props}
    />
  );
};

export const MDXComponents = {
  // Override default elements
  h1: (props: any) => (
    <h1 className="text-4xl font-bold my-6 tracking-tight text-foreground" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-12 mb-6 tracking-tight text-foreground" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold mt-10 mb-4 text-foreground" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold mt-8 mb-3 text-foreground" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 text-lg leading-relaxed" {...props} />
  ),
  a: CustomLink,
  ul: (props: any) => (
    <ul className="my-6 list-disc pl-10 space-y-3" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 list-decimal pl-10 space-y-3" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-6 italic my-8 py-2 text-muted-foreground" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,

  // Custom components
  SummaryBox,
  WorthKnowingBox,
  NextArticleBox,

  // Wrapper components
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={`bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono ${className || ''}`} {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={`bg-muted p-4 rounded-lg my-6 overflow-auto text-sm ${className || ''}`} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-foreground" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props} />
  ),

  // Table components
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-border" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-sm" {...props} />
  ),
}

export default MDXComponents 
