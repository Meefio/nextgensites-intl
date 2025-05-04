import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  // Create canonical URL for terms of service page
  const path = locale === 'pl' ? '/regulamin' : '/terms-of-service';
  const canonicalUrl = createCanonicalUrl(path, locale);

  // Create language alternates including x-default
  const languages = createLanguageAlternates('/regulamin', '/terms-of-service', 'pl');

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function Terms() {
  const t = await getTranslations('terms');

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-3">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <p className="text-muted-foreground">
        {t('lastUpdate')}: {new Date().toLocaleDateString()}
      </p>

      {/* General Provisions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.general.title')}</h2>
        {t.raw('sections.general.items').map((item: string, index: number) => (
          <p key={index}>{`${index + 1}. ${item}`}</p>
        ))}
      </section>

      {/* Definitions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.definitions.title')}</h2>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.definitions.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Scope */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.scope.title')}</h2>
        <p>{t('sections.scope.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.scope.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Payment */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.payment.title')}</h2>
        <p>{t('sections.payment.subscription.title')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.payment.subscription.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-4">{t('sections.payment.oneTime.title')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.payment.oneTime.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Ownership */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.ownership.title')}</h2>
        <p>{t('sections.ownership.subscription.title')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.ownership.subscription.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-4">{t('sections.ownership.oneTime.title')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.ownership.oneTime.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Responsibility */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.responsibility.title')}</h2>
        <p>{t('sections.responsibility.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.responsibility.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Final Provisions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.final.title')}</h2>
        {t.raw('sections.final.items').map((item: string, index: number) => (
          <p key={index}>{`${index + 1}. ${item}`}</p>
        ))}
      </section>
    </div>
  );
}
