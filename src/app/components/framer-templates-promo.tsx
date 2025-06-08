'use client';

import { ArrowRight, Palette, Zap, Star, ExternalLink } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { AnimatedElement } from "@/app/components/motion/animated-element";

export function FramerTemplatesPromo() {
  const t = useTranslations('FramerTemplatesPromo');
  const locale = useLocale();

  const framerTemplatesPath = locale === 'en' ? '/en/szablony-framer' : '/szablony-framer';

  const features = [
    {
      icon: Zap,
      title: t('features.readyToUse.title'),
      description: t('features.readyToUse.description')
    },
    {
      icon: Palette,
      title: t('features.professionalDesign.title'),
      description: t('features.professionalDesign.description')
    },
    {
      icon: Star,
      title: t('features.highQuality.title'),
      description: t('features.highQuality.description')
    }
  ];

  const templates = [
    {
      title: t('templates.businessPro.title'),
      description: t('templates.businessPro.description'),
      icon: Palette
    },
    {
      title: t('templates.creativeStudio.title'),
      description: t('templates.creativeStudio.description'),
      icon: Zap
    },
    {
      title: t('templates.portfolio.title'),
      description: t('templates.portfolio.description'),
      icon: Star
    },
    {
      title: t('templates.ecommerce.title'),
      description: t('templates.ecommerce.description'),
      icon: ExternalLink
    }
  ];

  const stats = [
    {
      value: t('stats.templates.value'),
      label: t('stats.templates.label')
    },
    {
      value: t('stats.time.value'),
      label: t('stats.time.label')
    },
    {
      value: t('stats.responsive.value'),
      label: t('stats.responsive.label')
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <AnimatedElement
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full mb-6">
              <Palette className="h-4 w-4" />
              <span className="text-sm font-medium">{t('badge')}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t('title')} <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('titleAccent')}
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('description')}
            </p>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {features.map((feature, index) => (
                <AnimatedElement
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className="flex items-center space-x-4 group"
                >
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 group rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link href={framerTemplatesPath}>
                  {t('exploreButton')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 py-3 border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 rounded-full group"
              >
                <Link href={framerTemplatesPath}>
                  <ExternalLink className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t('examplesButton')}
                </Link>
              </Button>
            </div>
          </AnimatedElement>

          {/* Right side - Preview cards */}
          <AnimatedElement
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Template preview cards */}
              {templates.map((template, index) => (
                <AnimatedElement
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  className={index % 2 === 1 ? "mt-8" : ""}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/30 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-3 flex items-center justify-center">
                        <template.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {template.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              ))}
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </AnimatedElement>
        </div>

        {/* Bottom stats section */}
        <AnimatedElement
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <AnimatedElement
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1, ease: "easeOut" }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </div>
    </section>
  );
} 
