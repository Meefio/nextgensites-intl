# Project Structure Documentation
Generated: 2025-04-18T18:13:17.739Z

## Overview
This document provides a detailed overview of the project structure to help with navigation and development.

## Project: next15-intl-template (0.1.0)
No description provided.

### Dependencies
#### Main Dependencies
- @hookform/resolvers: ^4.1.0
- @radix-ui/react-accordion: ^1.2.3
- @radix-ui/react-checkbox: ^1.1.4
- @radix-ui/react-dropdown-menu: ^2.1.6
- @radix-ui/react-label: ^2.1.2
- @radix-ui/react-slot: ^1.1.1
- @radix-ui/react-switch: ^1.1.3
- @radix-ui/react-toast: ^1.2.6
- @react-email/components: ^0.0.33
- @react-email/render: ^1.0.5
- @splinetool/react-spline: ^4.0.0
- @vercel/analytics: ^1.5.0
- class-variance-authority: ^0.7.1
- clsx: ^2.1.1
- critters: ^0.0.25
- framer-motion: ^12.0.11
- init: ^0.1.2
- lucide-react: ^0.474.0
- next: 15.1.6
- next-intl: ^3.26.3
- next-themes: ^0.4.4
- react: ^19.0.0
- react-country-flag: ^3.1.0
- react-dom: ^19.0.0
- react-hook-form: ^7.54.2
- resend: ^4.1.2
- shadcn: ^2.3.0
- tailwind-merge: ^2.6.0
- zod: ^3.24.2

#### Dev Dependencies
- @eslint/eslintrc: ^3
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- @typescript-eslint/eslint-plugin: ^8.24.0
- @typescript-eslint/parser: ^8.24.0
- eslint: ^9
- eslint-config-next: 15.1.6
- eslint-plugin-tailwindcss: ^3.18.0
- postcss: ^8
- ... and 2 more

### Scripts
- `dev`: next dev --turbopack
- `build`: next build
- `start`: next start
- `lint`: next lint

## Directory Structure
├── 📄 .env
├── 📄 .gitignore
├── 📄 eslint.config.mjs
├── 📁 **messages/**
│   ├── ⚙️ en.json
│   └── ⚙️ pl.json
├── 📝 next-env.d.ts
├── 📝 next.config.ts
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
├── 📄 postcss.config.mjs
├── 📚 project-index.md
├── 📁 **public/**
│   ├── 📄 android-chrome-192x192.png
│   ├── 📄 android-chrome-512x512.png
│   ├── 📄 apple-touch-icon.png
│   ├── 📄 favicon-16x16.png
│   ├── 📄 favicon-32x32.png
│   └── 📁 **images/**
│       ├── 📄 background-buildwise.webp
│       ├── 📄 blogbuildwise.webp
│       ├── 📄 BuildWise-CMS.webp
│       ├── 📄 buildwise-fullsize.webp
│       ├── 📄 BuildWise.webp
│       ├── 📄 Hero-Underpressure-min.jpg
│       ├── 📄 Hero-Underpressure-og-min.jpg
│       ├── 📄 home.png
│       ├── 📄 kwiaciarnia-strelicja-small-min.png
│       ├── 📄 logo.png
│       ├── 📄 MacBookProHero.png
│       ├── 📄 my-photo.png
│       ├── 📄 myciecisnieniem-full-size.webp
│       ├── 📄 myciecisnieniem-min.png
│       ├── 📄 nike.svg
│       ├── 📄 og-image.png
│       ├── 📄 openai.svg
│       ├── 📄 rank-2-min.jpg
│       ├── 📄 rank1-min.jpg
│       ├── 📄 tiktok.svg
│       ├── 📄 twitch.svg
│       ├── 📄 underpressure-small-min.png
│       └── 📄 UnderpressureHero.webp
├── 📚 README.md
├── 📁 **scripts/**
│   ├── 📝 index-project.js
│   └── 📝 index-translations.js
├── 📁 **src/**
│   ├── 📁 **app/**
│   │   ├── 📄 android-chrome-192x192.png
│   │   ├── 📄 android-chrome-512x512.png
│   │   ├── 📄 apple-icon.png
│   │   ├── 📁 **components/**
│   │   │   ├── 📝 about-section.tsx
│   │   │   ├── 📁 **analytics/**
│   │   │   ├── 📁 **animated-text-cycle/**
│   │   │   ├── 📝 BetterTitleChanger.tsx
│   │   │   ├── 📝 breadcrumb.tsx
│   │   │   ├── 📝 client-countdown-timer.tsx
│   │   │   ├── 📝 client-price-display.tsx
│   │   │   ├── 📝 client-promo-header.tsx
│   │   │   ├── 📝 ClientDocumentTitleWrapper.tsx
│   │   │   ├── 📝 contact-form.tsx
│   │   │   ├── 📝 cookie-banner.tsx
│   │   │   ├── 📝 cta.tsx
│   │   │   ├── 📁 **emails/**
│   │   │   ├── 📝 faq.tsx
│   │   │   ├── 📝 features-section.tsx
│   │   │   ├── 📝 footer.tsx
│   │   │   ├── 📝 header.tsx
│   │   │   ├── 📝 hero.tsx
│   │   │   ├── 📝 language-switcher.tsx
│   │   │   ├── 📁 **magicui/**
│   │   │   ├── 📝 mobile-navbar.tsx
│   │   │   ├── 📁 **motion/**
│   │   │   ├── 📁 **portfolio/**
│   │   │   ├── 📝 portfolio-section.tsx
│   │   │   ├── 📝 pricing.tsx
│   │   │   ├── 📝 ScrollToTop.tsx
│   │   │   ├── 📝 SocialProof.tsx
│   │   │   ├── 📝 theme-provider.tsx
│   │   │   ├── 📝 theme-switcher.tsx
│   │   │   ├── 📝 TimelineSection.tsx
│   │   │   ├── 📁 **ui/**
│   │   │   └── 📝 WhyNotWordPress-section.tsx
│   │   ├── 📄 favicon-16x16.png
│   │   ├── 📄 favicon-32x32.png
│   │   ├── 📄 favicon.ico
│   │   ├── 🎨 globals.css
│   │   ├── 📁 **hooks/**
│   │   │   ├── 📝 use-page-visibility.ts
│   │   │   └── 📝 use-toast.ts
│   │   ├── 📝 layout.tsx
│   │   ├── 📝 manifest.ts
│   │   ├── 📝 robots.ts
│   │   ├── 📝 sitemap.ts
│   │   ├── 📁 **utils/**
│   │   │   └── 📝 createCanonicalUrl.ts
│   │   ├── 📁 **[locale]/**
│   │   │   ├── 📁 **(legal)/**
│   │   │   ├── 📁 **(portfolio)/**
│   │   │   ├── 📁 **api/**
│   │   │   ├── 📝 layout.tsx
│   │   │   ├── 📝 metadata.ts
│   │   │   ├── 📝 opengraph-image.tsx
│   │   │   ├── 📝 page.tsx
│   │   │   └── 📝 twitter-image.tsx
│   │   └── 📁 **_actions/**
│   │       └── 📝 contact.ts
│   ├── 📁 **i18n/**
│   │   ├── 📝 request.ts
│   │   └── 📝 routing.ts
│   ├── 📁 **lib/**
│   │   ├── 📝 utils.ts
│   │   └── 📁 **validations/**
│   │       └── 📝 contact.ts
│   └── 📝 middleware.ts
├── 📝 tailwind.config.ts
└── ⚙️ tsconfig.json

## Key Files
- `next.config.ts`: Configuration for next
- `tailwind.config.ts`: Configuration for tailwind
- `src/middleware.ts`: Configuration for middleware
- `src/i18n/routing.ts`: Configuration for routing
- `.env`: Configuration for 
