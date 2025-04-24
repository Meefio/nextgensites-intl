import { redirect } from '@/i18n/routing';

export default function KnowledgeBaseArticlePage({
  params
}: {
  params: { locale: string; slug: string }
}) {
  // Redirect to the Polish version for now
  // In a real implementation we would show English content here
  redirect({
    href: {
      pathname: '/baza-wiedzy/[slug]',
      params: { slug: params.slug }
    },
    locale: params.locale
  });

  // This line will never be reached because of the redirect
  return null;
} 
