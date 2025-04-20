'use client'
import { CSSProperties, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { cn } from "@/lib/utils";

// Import from our new server component
import { isPromoActive as checkPromoActive } from "../promo-status";

interface TextShimmerProps {
  className?: string;
  shimmerWidth?: number;
}

export function TextShimmer({ className, shimmerWidth = 100 }: TextShimmerProps) {
  const t = useTranslations('Pricing');
  // Initialize with server-side value but then check client-side to handle potential time differences
  const [promoActive, setPromoActive] = useState(checkPromoActive());

  useEffect(() => {
    // Recheck on client side to ensure correct time-based rendering
    setPromoActive(checkPromoActive());
  }, []);

  const displayText = promoActive
    ? t('promoHeader')
    : t('shimmer');

  return (
    <p
      style={{
        "--shimmer-width": `${shimmerWidth}px`,
      } as CSSProperties}
      className={cn(
        "mx-auto max-w-md text-muted-foreground text-center",
        "py-2 flex items-center justify-center",
        "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        "bg-gradient-to-r from-neutral-100 via-black/80 via-50% to-neutral-100 dark:from-neutral-900 dark:via-white/80 dark:to-neutral-900",
        className,
      )}
    >
      {displayText}
    </p>
  );
}
