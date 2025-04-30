import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';

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
  // We get the locale here for potential future use
  const { locale: localeValue } = await params;

  // Using a comment to make ESLint aware that we're intentionally storing this value
  // for potential future use in this component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locale = localeValue;

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
