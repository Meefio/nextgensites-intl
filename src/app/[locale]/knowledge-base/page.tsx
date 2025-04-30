import { redirect } from '@/i18n/routing';

export default async function KnowledgeBasePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  // Await params before using properties
  const { locale } = await params;

  // Redirect to the Polish version since that's the primary content for now
  redirect({ href: '/baza-wiedzy', locale });

  // This line will never be reached because of the redirect
  return null;
} 
