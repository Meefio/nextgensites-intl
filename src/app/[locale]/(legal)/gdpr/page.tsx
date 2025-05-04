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
  const t = await getTranslations({ locale, namespace: 'gdpr' });

  // Create canonical URL for GDPR page
  const path = locale === 'pl' ? '/rodo' : '/gdpr';
  const canonicalUrl = createCanonicalUrl(path, locale);

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pl': createCanonicalUrl('/rodo', 'pl'),
        'en': createCanonicalUrl('/gdpr', 'en'),
      },
    },
  };
}

export default async function RODO() {
  const t = await getTranslations('gdpr');

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

      {/* Administrator */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.administrator.title')}</h2>
        <p>{t('sections.administrator.content')}</p>
      </section>

      {/* Processing Purposes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.purposes.title')}</h2>
        <p>{t('sections.purposes.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.purposes.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Recipients */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.recipients.title')}</h2>
        <p>{t('sections.recipients.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.recipients.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Storage Period */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.storage.title')}</h2>
        <p>{t('sections.storage.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.storage.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Rights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.rights.title')}</h2>
        <p>{t('sections.rights.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.rights.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Data Transfer */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.transfer.title')}</h2>
        <p>{t('sections.transfer.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.transfer.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t('sections.transfer.note')}</p>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('sections.contact.title')}</h2>
        <p>{t('sections.contact.intro')}</p>
        <ul className="list-disc pl-6 mt-2">
          {t.raw('sections.contact.items').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
