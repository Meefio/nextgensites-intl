import React from "react";
import { Timeline } from "@/app/components/ui/timeline";
import { useTranslations } from 'next-intl';

export function TimelineSection() {
  const t = useTranslations('Timeline');

  const data = [
    {
      title: t('steps.step1.title'),
      content: (
        <p className="text-muted-foreground">
          {t('steps.step1.content')}
        </p>
      ),
    },
    {
      title: t('steps.step2.title'),
      content: (
        <p className="text-muted-foreground">
          {t('steps.step2.content')}
        </p>
      ),
    },
    {
      title: t('steps.step3.title'),
      content: (
        <p className="text-muted-foreground">
          {t('steps.step3.content')}
        </p>
      ),
    },
    {
      title: t('steps.step4.title'),
      content: (
        <p className="text-muted-foreground">
          {t('steps.step4.content')}
        </p>
      ),
    },
    {
      title: t('steps.step5.title'),
      content: (
        <p className="text-muted-foreground">
          {t('steps.step5.content')}
        </p>
      ),
    },
    {
      title: t('steps.step6.title'),
      content: (
        <p className="text-muted-foreground">
          {t('steps.step6.content')}
        </p>
      ),
    },
  ];

  return <Timeline data={data} />;
}
