# NextGenSites Project Index

## Project Overview
This is a Next.js 15 project using:
- next-intl for internationalization
- Tailwind CSS for styling
- React 19
- TypeScript
- Radix UI components
- React Hook Form
- Zod for validation
- Framer Motion for animations

## Key Directories
- `/src/app`: Main application code
- `/src/app/[locale]`: Language-specific routes
- `/src/app/components`: UI components
- `/src/i18n`: Internationalization configuration
- `/messages`: Translation message files
- `/public`: Static assets

## Environment Configuration
Check `.env` for environment variables.

## Important Files
- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `src/middleware.ts`: Handles internationalization routing
- `src/i18n/routing.ts`: i18n routing configuration

## Build Commands
- `pnpm dev`: Run development server with Turbopack
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run linting

## Notes
This project uses:
- Project has routing '/' for Polish content and '/en' for english content. For eg. 'https://nextgensites.pl/strona-internetowa-dla-firmy-sprzatajacej' and 'https://nextgensites.pl/en/cleaning-company-website'
- App Router for routing
- Server Components for server-rendered content
- Client Components where interactivity is needed
- i18n routing for multilingual support

## Core Features
- Internationalization with next-intl
- Responsive design with Tailwind CSS
- Type-safe code with TypeScript
- Modern UI components

## Best Practices for Changes
1. Check existing components before creating new ones
2. Follow the established code patterns
3. Use the internationalization system for all user-facing text
4. Keep components single-purpose
5. Follow the established directory structure 
