import { redirect } from '@/i18n/routing';

export default async function KnowledgeBaseArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  // Await params before using properties
  const { locale, slug } = await params;

  // Redirect to the Polish version for now
  // In a real implementation we would show English content here
  redirect({
    href: {
      pathname: '/baza-wiedzy/[slug]',
      params: { slug }
    },
    locale
  });

  // This line will never be reached because of the redirect
  return null;
} 
