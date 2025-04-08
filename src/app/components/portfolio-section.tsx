import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/app/components/ui/card"
import { AnimatedElement } from "@/app/components/motion/animated-element"
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'

interface Project {
  slug: string
  image: string
  title: string
  description: string
  tags: string[]
  imageAlt: string
  link: string
  viewLiveLink?: string
}

const Portfolio = () => {
  const t = useTranslations('Portfolio')

  const projects: Project[] = [
    {
      slug: 'myciecisnieniem.pl',
      image: '/images/underpressure-small-min.png',
      title: t('projects.project1.title'),
      description: t.raw('projects.project1.description'),
      tags: t.raw('projects.project1.tags') as string[],
      imageAlt: t('projects.project1.imageAlt'),
      link: '/underpressure',
      viewLiveLink: 'https://myciecisnieniem.pl'
    },
    {
      slug: 'buildwise.com.pl',
      image: '/images/BuildWise.webp',
      title: t('projects.project2.title'),
      description: t.raw('projects.project2.description'),
      tags: t.raw('projects.project2.tags') as string[],
      imageAlt: t('projects.project2.imageAlt'),
      link: '/buildwise',
      viewLiveLink: 'https://buildwise-alpha.vercel.app/pl'
    }
  ]

  return (
    <section
      id='portfolio'
      className="container flex flex-col items-center gap-6 py-14 md:pb-14 sm:gap-7 scroll-mt-header"
    >
      <AnimatedElement
        className="flex flex-col gap-3"
        delay={0.2}
        viewport={{ once: true, margin: "-20% 0px" }}
      >
        <span className="font-bold uppercase text-primary text-center">
          {t('why')}
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          {t('heading')}
        </h2>
        <p
          className="text-lg text-muted-foreground text-balance max-w-3xl text-center"
          dangerouslySetInnerHTML={{ __html: t.raw('subheading') }}
        />
      </AnimatedElement>

      <div className="mt-10 grid gap-8 md:grid-cols-2 w-full">
        {projects.map((project, index) => (
          <AnimatedElement
            key={project.slug}
            delay={index * 0.2}
            viewport={{ once: true, margin: "-20% 0px" }}
          >
            <Card className="h-full flex flex-col group/card overflow-hidden max-w-full">
              <Link href={project.link} className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1156}
                  height={650}
                  className="object-cover max-h-[420px] object-top transition-transform duration-500 group-hover/card:scale-105"
                  title={project.title}
                />
              </Link>
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <div
                    className="text-sm text-muted-foreground mb-4 prose prose-sm prose-muted max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    {project.viewLiveLink && (
                      <>
                        <Link href={project.viewLiveLink} target='_blank' rel='noopener noreferrer'>
                          <Button variant="outline" className="group">
                            {t('buttons.viewLive')}
                          </Button>
                        </Link>
                        <Link href={project.link}>
                          <Button className="group">
                            {t('buttons.learnMore')}
                          </Button>
                        </Link>
                      </>
                    )}
                    {!project.viewLiveLink && (
                      <Link href={project.link}>
                        <Button className="group">
                          {t('buttons.learnMore')}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        ))}
      </div>
    </section>
  )
}

export default Portfolio 
