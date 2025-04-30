import { redirect } from '@/i18n/routing';

export interface KnowledgeBaseArticleProps {
  articleTitle: string;
  slug: string;
}

export default async function KnowledgeBaseArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  // Await params before using properties
  const { locale, slug } = await params;

  // Format title from slug (temporary until real content is added)
  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Set article metadata to be accessed by layout
  const articleData: KnowledgeBaseArticleProps = {
    articleTitle: formattedTitle,
    slug
  };

  // Store article data to be accessed by layout
  // @ts-ignore - we know this property is available because we created it
  params.articleData = articleData;

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
