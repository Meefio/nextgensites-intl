import { Metadata } from 'next';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { DynamicBreadcrumb } from '@/app/components/dynamic-breadcrumb';
import { KnowledgeBaseArticleProps } from './types';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'pl' ? 'Baza Wiedzy' : 'Knowledge Base';
  const description =
    locale === 'pl'
      ? 'Odkryj artykuły, poradniki i eksperckie wskazówki, które pomogą Ci podejmować lepsze decyzje dotyczące Twojej strony internetowej'
      : 'Discover articles, guides, and expert tips to help you make better decisions about your website';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
    },
  };
}

export default async function KnowledgeBaseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string, articleData?: KnowledgeBaseArticleProps }>;
}) {
  // Resolve params to get locale and article data if available
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Extract article title if available (when on an article page)
  const articleTitle = resolvedParams.articleData?.articleTitle;

  return (
    <>
      <Header />
      {/* Knowledge Base Header */}
      <div className="pt-4 md:pt-10 pb-4 md:pb-6 border-b">
        <div className="container">
          <div className="mb-6">
            {/* Passing article title to DynamicBreadcrumb when available */}
            <DynamicBreadcrumb
              locale={locale}
              articleTitle={articleTitle}
            />
          </div>
        </div>
      </div>

      <main className="container pb-4 md:pb-10">
        {children}
      </main>
      <Footer />
    </>
  );
} 
