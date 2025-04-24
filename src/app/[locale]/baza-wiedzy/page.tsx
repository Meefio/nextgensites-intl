import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BookOpen, Clock, ChevronRight, BookText, Sparkles } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'KnowledgeBase' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
    },
  };
}

export default async function KnowledgeBasePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'KnowledgeBase' });
  const blogArticle = await getTranslations({ locale, namespace: 'BlogArticle.howToChooseWebsite' });

  // Define articles (for now we only have one)
  const articles = [
    {
      id: 'how-to-choose-website',
      title: blogArticle('title'),
      description: blogArticle('description'),
      publishDate: blogArticle('publishDate'),
      category: blogArticle('category'),
      readingTime: blogArticle('readingTime'),
      slug: locale === 'pl' ? 'jak-wybrac-dobra-strone-internetowa-dla-swojej-firmy' : 'how-to-choose-the-right-website-for-your-business',
      featured: true,
      imageUrl: '/images/buildwise-fullsize.webp'
    }
  ];

  // Upcoming articles (placeholders)
  const upcomingArticles = [
    {
      id: 'website-cost',
      title: locale === 'pl'
        ? 'Ile kosztuje strona internetowa? Co wpływa na cenę?'
        : 'How much does a website cost? What affects the price?',
      description: locale === 'pl'
        ? 'Poznaj rzeczywiste czynniki wpływające na koszt strony internetowej i jak wybrać najlepszą opcję dla swojego biznesu.'
        : 'Learn the real factors that affect website cost and how to choose the best option for your business.',
      category: locale === 'pl' ? 'Biznes' : 'Business',
      comingSoon: true
    },
    {
      id: 'seo-basics',
      title: locale === 'pl'
        ? 'Podstawy SEO dla właścicieli biznesu'
        : 'SEO Basics for Business Owners',
      description: locale === 'pl'
        ? 'Proste kroki, które możesz wykonać, aby poprawić pozycję Twojej strony w wynikach wyszukiwania Google.'
        : 'Simple steps you can take to improve your website\'s position in Google search results.',
      category: locale === 'pl' ? 'SEO' : 'SEO',
      comingSoon: true
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Page Header with improved visual styling */}
      <div className="relative mb-16">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-70 z-0"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-70 z-0"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>{locale === 'pl' ? 'Przydatna wiedza' : 'Useful knowledge'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {t('title')}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Featured Article */}
      {articles.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookText className="mr-2 h-6 w-6 text-primary" />
            {locale === 'pl' ? 'Wyróżniony artykuł' : 'Featured Article'}
          </h2>

          <Link
            href={{
              pathname: '/baza-wiedzy/[slug]',
              params: { slug: articles[0].slug }
            }}
            className="group"
          >
            <div className="border border-border hover:border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-2 aspect-video md:aspect-auto relative overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="h-full w-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {articles[0].category}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-3 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{articles[0].readingTime}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {articles[0].publishDate}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {articles[0].title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {articles[0].description}
                  </p>

                  <div className="flex items-center text-primary font-medium">
                    <span>{t('readMore')}</span>
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Upcoming Articles */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BookText className="mr-2 h-6 w-6 text-primary" />
          {locale === 'pl' ? 'Nadchodzące artykuły' : 'Upcoming Articles'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingArticles.map((article) => (
            <div
              key={article.id}
              className="p-6 border border-border rounded-xl hover:border-primary/20 bg-card transition-colors"
            >
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                {locale === 'pl' ? 'Wkrótce' : 'Coming soon'}
              </span>

              <h3 className="text-xl font-semibold mb-2">
                {article.title}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {article.description}
              </p>

              <div className="flex items-center text-sm text-muted-foreground">
                <span className="inline-flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{locale === 'pl' ? 'Ok. 5 min czytania' : 'Approx. 5 min read'}</span>
                </span>
                <span className="px-2.5 py-0.5 bg-muted rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State - Used when no articles are available */}
      {articles.length === 0 && upcomingArticles.length === 0 && (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('emptyState')}</h3>
        </div>
      )}
    </div>
  );
} 
