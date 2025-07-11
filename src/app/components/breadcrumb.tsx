import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  locale: string;
}

// Utility function to convert a string to a path parameter
const asPathname = (path: string) => {
  // This makes TypeScript treat the string as a valid pathname
  // We need to cast this way because Link expects specific string literals
  return path as ComponentProps<typeof Link>['href'];
};

export const Breadcrumb = ({ items, className, locale }: BreadcrumbProps) => {
  // Use state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // After hydration is complete, set mounted to true
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate the structured data for breadcrumbs
  const baseUrl = "https://nextgensites.pl";
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${baseUrl}${locale !== 'pl' ? `/${locale}` : ''}${item.href}` : undefined
    }))
  };

  // Create a stable string representation for server-side rendering
  const jsonLdString = JSON.stringify(breadcrumbStructuredData);

  return (
    <>
      {/* Structured data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* Visible breadcrumb component */}
      <nav
        aria-label="Breadcrumb"
        className={cn("flex w-full text-xs sm:text-sm text-gray-600 dark:text-gray-400 my-1 sm:my-2 overflow-hidden", className)}
      >
        <ol className="inline-flex items-center flex-wrap space-x-0.5 md:space-x-2 w-full overflow-hidden">
          {items.map((item, index) => (
            <li key={index} className="inline-flex items-center max-w-[150px] sm:max-w-fit">
              {index > 0 && (
                <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 mx-0.5 sm:mx-1 text-gray-400 shrink-0" />
              )}

              {/* During SSR and initial hydration, render placeholders */}
              {!mounted ? (
                // Simple span to ensure consistent server/client rendering
                <span className="inline-flex items-center truncate max-w-[100px] sm:max-w-none">
                  {index === 0 && <HomeIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : item.isCurrentPage ? (
                // After hydration, render the real components
                <span
                  className="inline-flex items-center font-medium text-accent dark:text-accent truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {index === 0 && (
                    <HomeIcon className="h-3 w-3 sm:h-3 sm:w-3 mr-0.5 sm:mr-2 shrink-0" />
                  )}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href ? asPathname(item.href) : asPathname('/')}
                  className="inline-flex items-center text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors truncate max-w-[170px] sm:max-w-none"
                >
                  {index === 0 && (
                    <HomeIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 shrink-0" />
                  )}
                  <span className="truncate">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}; 
