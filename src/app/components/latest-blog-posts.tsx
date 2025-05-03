import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/utils/mdx";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Clock, ChevronRight } from "lucide-react";
import { AnimatedElement } from "@/app/components/motion/animated-element";

interface LatestBlogPostsProps {
  locale: string;
}

export async function LatestBlogPosts({ locale }: LatestBlogPostsProps) {
  const t = await getTranslations({ locale, namespace: "BlogPosts" });

  // Get the latest 3 posts for the current locale
  const latestPosts = getAllPosts(locale).slice(0, 3);

  // If no posts are available, don't render the section
  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <AnimatedElement
          className="flex flex-col gap-3"
          delay={0.2}
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <span className="font-bold uppercase text-primary text-center">
            {t('sectionLabel')}
          </span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-xl text-center mx-auto">
            {t('description')}
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-12">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={{
                pathname: "/baza-wiedzy/[slug]",
                params: { slug: post.slug }
              }}
              className="group block h-full"
            >
              <div className="flex flex-col h-full border border-border hover:border-primary/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-card">
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={400}
                    height={225}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    fetchPriority="low"
                    priority={false}
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readingTime}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.summaryPoints && post.summaryPoints[0]}
                  </p>

                  <div className="flex justify-end items-center text-primary font-medium mt-auto">
                    <span>{t("readMore")}</span>
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors duration-200"
          >
            {t("viewAllPosts")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestBlogPosts; 
