import React from 'react';
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

  return (
    <>
      {/* Structured data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* Visible breadcrumb component */}
      <nav
        aria-label="Breadcrumb"
        className={cn("flex text-sm text-gray-600 dark:text-gray-400", className)}
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          {items.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="h-4 w-4 mx-1 text-gray-400" />
              )}

              {item.isCurrentPage ? (
                <span
                  className="inline-flex items-center font-medium text-gray-700 dark:text-gray-300"
                  aria-current="page"
                >
                  {index === 0 && (
                    <HomeIcon className="h-4 w-4 mr-1" />
                  )}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href ? asPathname(item.href) : asPathname('/')}
                  className="inline-flex items-center hover:text-blue-600 dark:hover:text-blue-500"
                >
                  {index === 0 && (
                    <HomeIcon className="h-4 w-4 mr-1" />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}; 
