import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { createCanonicalUrl } from '@/app/utils/createCanonicalUrl';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  // Create canonical URL for privacy policy page
  const path = locale === 'pl' ? '/polityka-prywatnosci' : '/privacy-policy';
  const canonicalUrl = createCanonicalUrl(path, locale);

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pl': createCanonicalUrl('/polityka-prywatnosci', 'pl'),
        'en': createCanonicalUrl('/privacy-policy', 'en'),
      },
    },
  };
}

export default async function PrivacyPolicy() {
  const t = await getTranslations('privacy');

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
        {t('lastUpdate')}: 17.02.2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.general.title')}</h2>
        <p>{t('sections.general.content')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.administrator.title')}</h2>
        <p>{t('sections.administrator.content')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.cookies.title')}</h2>
        <p>{t('sections.cookies.intro')}</p>
        <p className="font-semibold mt-4">{t('sections.cookies.firstParty.title')}</p>
        <ul className="list-disc pl-6 mt-2">
          {(t.raw('sections.cookies.firstParty.items') as Array<string>).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="font-semibold mt-4">{t('sections.cookies.thirdParty.title')}</p>
        <ul className="list-disc pl-6 mt-2">
          {(t.raw('sections.cookies.thirdParty.items') as Array<string>).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.purposes.title')}</h2>
        <p>{t('sections.purposes.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {(t.raw('sections.purposes.items') as Array<string>).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          {t('sections.purposes.note')}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.analytics.title')}</h2>
        <p>{t('sections.analytics.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {(t.raw('sections.analytics.items') as Array<string>).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.rights.title')}</h2>
        <p>{t('sections.rights.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {(t.raw('sections.rights.items') as Array<string>).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.contact.title')}</h2>
        <p>{t('sections.contact.content')}</p>
      </section>
    </div>
  );
}
