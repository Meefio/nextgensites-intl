# Pricing Components Architecture

## Overview

The pricing section uses a modern server-first architecture where most components are server components for optimal performance, with client components used only where necessary for interactivity.

## Component Structure

### Server Components

- `pricing.tsx` - Main pricing component that renders the pricing section
- `price-display.tsx` - Displays pricing information based on promo status
- `promo-header.tsx` - Displays promotion header when active
- `countdown-timer.tsx` - Server component for countdown timer (days, hours, minutes)
- `promo-status.ts` - Core utility for determining if a promotion is active

### Client Components

- `client-seconds-display.tsx` - Client component for real-time seconds display
- `pricing/client-animated-pricing.tsx` - Client wrapper components for animations

## Architecture Decisions

1. **Server-first**: Most content is rendered on the server for better SEO and performance.
   
2. **Minimal client components**: Client components are used only for parts that need interactivity:
   - The seconds counter needs client-side updates every second
   - Animations using Framer Motion require client components

3. **Shared promotion logic**: The `promo-status.ts` utility provides promotion status both for server components and client components.

## Promotion Logic

- The promotion end date is defined in `promo-status.ts`
- Server components check the status during server rendering
- Client components recheck the status on the client for accurate time-based display

## Usage

Import pricing components from the main export in `pricing/index.ts`:

```tsx
import { 
  Pricing, 
  PriceDisplay, 
  PromoHeader, 
  CountdownTimer 
} from '@/app/components/pricing'
```

For client-side animation wrappers, import directly:

```tsx
import { 
  ClientAnimatedWrapper, 
  ClientAnimatedCard 
} from '@/app/components/pricing/client-animated-pricing'
``` 
