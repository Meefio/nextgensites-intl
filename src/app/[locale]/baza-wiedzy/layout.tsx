import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations({ locale, namespace: 'KnowledgeBase' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
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
      <div className="pt-10 pb-6 border-b">
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

      <main className="container py-10">
        {children}
      </main>
      <Footer />
    </>
  );
} 
