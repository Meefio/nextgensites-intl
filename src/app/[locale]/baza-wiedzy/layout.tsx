import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { DynamicBreadcrumb } from '@/app/components/dynamic-breadcrumb';

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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header />
      {/* Knowledge Base Header */}
     
      <main className="container py-10">
        {children}
      </main>
      <Footer />
    </>
  );
} 
