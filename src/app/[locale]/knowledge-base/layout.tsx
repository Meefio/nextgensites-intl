import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { Breadcrumb } from '@/app/components/breadcrumb';

export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'KnowledgeBase' });

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
  params: { locale: string }
}) {
  const t = await getTranslations({ locale: params.locale, namespace: 'KnowledgeBase' });

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/' },
    { label: t('breadcrumbs.knowledgeBase'), href: '/knowledge-base', isCurrentPage: true }
  ];

  return (
    <>
      <Header />
      {/* Knowledge Base Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background pt-10 pb-6 border-b">
        <div className="container">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} locale={params.locale} />
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
