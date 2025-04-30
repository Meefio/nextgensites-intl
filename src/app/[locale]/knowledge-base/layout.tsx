import { Metadata } from 'next';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { DynamicBreadcrumb } from '@/app/components/dynamic-breadcrumb';
import { getTranslations } from 'next-intl/server';
import { KnowledgeBaseArticleProps } from './[slug]/page';

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
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string, articleData?: KnowledgeBaseArticleProps }>
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Extract article title if available (when on an article page)
  const articleTitle = resolvedParams.articleData?.articleTitle;

  return (
    <>
      <Header />
      {/* Knowledge Base Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background pt-10 pb-6 border-b">
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
