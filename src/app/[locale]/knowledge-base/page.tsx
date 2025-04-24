import { redirect } from '@/i18n/routing';

export default function KnowledgeBasePage({
  params
}: {
  params: { locale: string }
}) {
  // Redirect to the Polish version since that's the primary content for now
  redirect({ href: '/baza-wiedzy', locale: params.locale });

  // This line will never be reached because of the redirect
  return null;
} 
