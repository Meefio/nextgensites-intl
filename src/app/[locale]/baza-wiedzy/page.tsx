import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BookOpen, Clock, ChevronRight, BookText, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import { createCanonicalUrl, createLanguageAlternates } from '@/app/utils/createCanonicalUrl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getAllPosts } from '@/lib/sanity/queries';
import { urlFor, getLocalizedValue, getLocalizedExcerpt } from '@/lib/sanity/client';
import { formatDateForLocale } from '@/utils/date-utils';

interface PageProps {
  params: Promise<{
    locale: string
  }>;
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'KnowledgeBase' });

  // Create canonical URL for knowledge base index page
  const path = locale === 'pl' ? '/baza-wiedzy' : '/knowledge-base';
  const canonicalUrl = createCanonicalUrl(path, locale);

  // Create language alternates including x-default
  const languages = createLanguageAlternates('/baza-wiedzy', '/knowledge-base', 'pl');

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: canonicalUrl,
    },
  };
}

export default async function KnowledgeBasePage({
  params
}: PageProps) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'KnowledgeBase' });

  // Get all posts for the current locale from Sanity
  let posts: any[] = [];

  try {
    posts = await getAllPosts(locale);
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* Page Header with improved visual styling */}
      <div className="relative mb-16 overflow-x-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>{locale === 'pl' ? 'Przydatna wiedza' : 'Useful knowledge'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text">
            {t('title')}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Articles */}
      {posts.length > 0 ? (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookText className="mr-2 h-6 w-6 text-primary" />
            {locale === 'pl' ? 'Dostępne artykuły' : 'Available Articles'}
          </h2>

          <div className="space-y-8">
            {posts.map((post) => {
              // Get localized title and excerpt
              const title = getLocalizedValue(post.title, locale) as string || '';
              const excerpt = getLocalizedExcerpt(post, locale);

              // Get the slug for the current locale
              const slug =
                // Handle when post.slug is a LocalizedField (with language keys)
                (typeof post.slug === 'object' && post.slug !== null && locale in post.slug)
                  ? (post.slug as Record<string, { current: string }>)[locale]?.current || ''
                  // Handle when post.slug is a simple { current: string } object
                  : (post.slug as { current: string })?.current || '';

              return (
                <Link
                  key={post._id}
                  href={{
                    pathname: '/baza-wiedzy/[slug]',
                    params: { slug }
                  }}
                  className="group block"
                >
                  <div className="border border-border hover:border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 min-h-[250px]">
                      <div className="md:col-span-2 relative overflow-hidden bg-muted">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                        {post.coverImage ? (
                          <Image
                            src={urlFor(post.coverImage).width(500).height(280).url()}
                            alt={title || 'Article image'}
                            width={500}
                            height={280}
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                            style={{
                              aspectRatio: '16/9',
                              objectFit: 'cover'
                            }}
                            priority
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground opacity-50" />
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3">
                          {post.categories && post.categories.length > 0 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground transition-colors">
                              {getLocalizedValue(post.categories[0].title, locale)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-3 p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{locale === 'pl' ? 'Ok. 5 min czytania' : 'Approx. 5 min read'}</span>
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDateForLocale(post.publishedAt, locale)}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                          {title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {excerpt}
                        </p>

                        <div className="flex items-center text-primary font-medium">
                          <span>{t('readMore')}</span>
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('emptyState')}</h3>
        </div>
      )}
    </div>
  );
} 
