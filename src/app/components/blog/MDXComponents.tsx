import Link from 'next/link'
import { SummaryBox } from './SummaryBox'
import { WorthKnowingBox } from './WorthKnowingBox'
import { NextArticleBox } from './NextArticleBox'

export const MDXComponents = {
  // Override default elements
  h1: (props: any) => (
    <h1 className="text-4xl font-bold my-6 tracking-tight" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-12 mb-6 tracking-tight" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold mt-10 mb-4" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold mt-8 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 text-lg leading-relaxed" {...props} />
  ),
  a: (props: any) => (
    <Link
      className="text-primary hover:underline font-medium"
      {...props}
    />
  ),
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
  Code: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <code className={`bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono ${className || ''}`}>
      {children}
    </code>
  ),
  Pre: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <pre className={`bg-muted p-4 rounded-lg my-6 overflow-auto text-sm ${className || ''}`}>
      {children}
    </pre>
  ),
  Strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-foreground">{children}</strong>
  ),
  Em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  Table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        {children}
      </table>
    </div>
  ),
  Thead: (props: any) => (
    <thead className="bg-muted" {...props} />
  ),
  Tbody: (props: any) => (
    <tbody className="divide-y divide-border" {...props} />
  ),
  Tr: (props: any) => (
    <tr {...props} />
  ),
  Th: (props: any) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
  ),
  Td: (props: any) => (
    <td className="px-4 py-3 text-sm" {...props} />
  ),
}

export default MDXComponents 
