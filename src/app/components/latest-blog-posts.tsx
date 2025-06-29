import { getFeaturedPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Clock, ChevronRight } from "lucide-react";
import { AnimatedElement } from "@/app/components/motion/animated-element";
import { Button } from "@/app/components/ui/button";
import type { LocalizedField, SanitySlug } from "@/lib/sanity/types";

interface LatestBlogPostsProps {
  locale: string;
}

// Helper function to get localized value
const getLocalizedValue = <T,>(field: { [key: string]: T } | undefined, locale: string): T | undefined => {
  if (!field) return undefined;
  return field[locale] || field['en'] || field['pl'];
};

// Helper function to get slug string from post slug field
const getSlugString = (slugField: LocalizedField<SanitySlug> | { current: string } | undefined, locale: string): string | undefined => {
  if (!slugField) return undefined;

  // Handle case where slugField is { current: string }
  if ('current' in slugField && typeof slugField.current === 'string') {
    return slugField.current;
  }

  // Handle case where slugField is LocalizedField<SanitySlug>
  const localizedSlug = getLocalizedValue(slugField as LocalizedField<SanitySlug>, locale);
  return localizedSlug?.current;
};

export async function LatestBlogPosts({ locale }: LatestBlogPostsProps) {
  // Get featured posts from Sanity
  const featuredPosts = await getFeaturedPosts(locale);

  // If no posts are available, don't render the section
  if (featuredPosts.length === 0) {
    return null;
  }

  const t = {
    sectionLabel: locale === 'pl' ? 'BAZA WIEDZY' : 'BLOG',
    title:
      locale === 'pl'
        ? 'Najnowsze poradniki z naszej bazy wiedzy'
        : 'Latest from Our Knowledge Base',
    description:
      locale === 'pl'
        ? 'Sprawdź, nie pożałujesz'
        : 'Explore our latest articles with expert insights and practical tips for your online business',
    readMore: locale === 'pl' ? 'Czytaj artykuł' : 'Read article',
    viewAllPosts: locale === 'pl' ? 'Zobacz wszystkie artykuły' : 'View all articles'
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <AnimatedElement
          className="flex flex-col gap-3"
          delay={0.2}
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <span className="font-bold uppercase text-primary text-center">
            {t.sectionLabel}
          </span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-xl text-center mx-auto">
            {t.description}
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-12">
          {featuredPosts.map((post, index) => {
            // Get localized values
            const title = getLocalizedValue(post.title, locale) || 'Untitled';
            const excerpt = getLocalizedValue(post.excerpt, locale) || '';
            const slug = getSlugString(post.slug, locale);
            const categoryTitle = post.category ? getLocalizedValue(post.category.title, locale) : '';

            // Skip posts without valid slug
            if (!slug) {
              return null;
            }

            // Format date
            const date = new Date(post.publishedAt).toLocaleDateString(
              locale === 'pl' ? 'pl-PL' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            );

            // Reading time with localized text
            const readingTimeText = post.readingTime
              ? (locale === 'pl' ? `${post.readingTime} min czytania` : `${post.readingTime} min read`)
              : (locale === 'pl' ? '5 min czytania' : '5 min read');

            return (
              <AnimatedElement
                key={post._id}
                delay={index * 0.1}
                viewport={{ once: true, margin: "-20% 0px" }}
              >
                <Link
                  href={{
                    pathname: "/baza-wiedzy/[slug]",
                    params: { slug: slug }
                  }}
                  className="group block h-full"
                >
                  <div className="flex flex-col h-full border border-border hover:border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-card">
                    <div className="relative overflow-hidden aspect-video">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      {post.coverImage && (
                        <Image
                          src={urlFor(post.coverImage).width(400).height(225).url()}
                          alt={title}
                          width={400}
                          height={225}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ width: '100%', height: 'auto' }}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          fetchPriority="low"
                          priority={false}
                        />
                      )}
                      {categoryTitle && (
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                            {categoryTitle}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col p-6 flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{readingTimeText}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {date}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {excerpt}
                      </p>

                      <div className="flex justify-end items-center text-primary font-medium mt-auto">
                        <span>{t.readMore}</span>
                        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            );
          }).filter(Boolean)}
        </div>
        <AnimatedElement
          delay={0.1}
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          <div className="flex justify-center mt-12">
            <Button variant="default" asChild>
              <Link href="/baza-wiedzy">
                {t.viewAllPosts}
              </Link>
            </Button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default LatestBlogPosts; 
