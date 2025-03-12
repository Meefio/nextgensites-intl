'use client'
import { CSSProperties } from "react";
import { usePromoStatus } from "../client-countdown-timer";
import { useTranslations } from 'next-intl';

import { cn } from "@/lib/utils";

interface TextShimmerProps {
  className?: string;
  shimmerWidth?: number;
}

export function TextShimmer({ className, shimmerWidth = 100 }: TextShimmerProps) {
  const t = useTranslations('Pricing');
  const isPromoActive = usePromoStatus();

  const displayText = isPromoActive
    ? t('promoHeader')
    : t('shimmer');

  return (
    <p
      style={{
        "--shimmer-width": `${shimmerWidth}px`,
      } as CSSProperties}
      className={cn(
        "mx-auto max-w-md text-muted-foreground",
        "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        "bg-gradient-to-r from-neutral-100 via-black/80 via-50% to-neutral-100 dark:from-neutral-900 dark:via-white/80 dark:to-neutral-900",
        className,
      )}
    >
      {displayText}
    </p>
  );
}
