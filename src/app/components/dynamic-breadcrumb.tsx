'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Breadcrumb } from '@/app/components/breadcrumb';
import { useEffect, useState } from 'react';

interface DynamicBreadcrumbProps {
  locale: string;
  articleTitle?: string;
}

export function DynamicBreadcrumb({
  locale,
  articleTitle: propArticleTitle
}: DynamicBreadcrumbProps) {
  const t = useTranslations('KnowledgeBase');
  const pathname = usePathname();

  // Process pathname to handle both formats (/en/knowledge-base and /knowledge-base)
  const normalizedPath = pathname.replace(/^\/en\//, '/');

  // Get formatted title from URL for initial render and fallback
  const getFormattedTitleFromUrl = () => {
    const lastSegment = pathname.split('/').pop() || '';
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Initialize title state with prop or URL-derived title to prevent flickering
  const initialTitle = propArticleTitle || getFormattedTitleFromUrl();
  const [articleTitle, setArticleTitle] = useState<string>(initialTitle);
  const [mounted, setMounted] = useState(false);

  // Define knowledge base paths based on locale
  const knowledgeBasePath = locale === 'en' ? '/knowledge-base' : '/baza-wiedzy';
  const localizedBasePath = locale === 'en' ? '/en/knowledge-base' : '/baza-wiedzy';

  // Determine if we're on an article page - directly compare the full paths to avoid hydration mismatch
  const isArticlePage = pathname !== localizedBasePath;

  // Mark component as mounted after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Try to get article title from DOM after component mounts and hydration
  // But only if we don't already have a prop title
  useEffect(() => {
    if (!mounted || propArticleTitle) return;

    // Don't clear the title during hydration
    let foundTitle = false;

    // First, try to find a data-article-title attribute
    const articleElements = document.querySelectorAll('[data-article-title]');
    if (articleElements.length > 0) {
      const titleFromDOM = articleElements[0].getAttribute('data-article-title');
      if (titleFromDOM) {
        setArticleTitle(titleFromDOM);
        foundTitle = true;
      }
    }

    // If no data attribute found, try looking for the h1 element
    if (!foundTitle) {
      const h1Elements = document.querySelectorAll('h1');
      if (h1Elements.length > 0 && h1Elements[0].textContent) {
        setArticleTitle(h1Elements[0].textContent);
        foundTitle = true;
      }
    }

    // As a last resort, use document title without site name
    if (!foundTitle) {
      const docTitle = document.title;
      if (docTitle) {
        // Remove site name part if it exists (typically after separator like " | " or " - ")
        const separators = [' | ', ' - ', ' — ', ' – '];
        let cleanTitle = docTitle;

        for (const separator of separators) {
          if (docTitle.includes(separator)) {
            cleanTitle = docTitle.split(separator)[0].trim();
            break;
          }
        }

        // Only set if we found a reasonable title
        if (cleanTitle && cleanTitle.length > 0) {
          setArticleTitle(cleanTitle);
        }
      }
    }
  }, [propArticleTitle, pathname, mounted]);

  // Create breadcrumb items - always use paths without the /en prefix as the Breadcrumb component adds locale
  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/' },
    {
      label: t('breadcrumbs.knowledgeBase'),
      href: knowledgeBasePath,
      isCurrentPage: pathname === localizedBasePath
    }
  ];

  // Add article title if we're on an article page
  if (isArticlePage && (normalizedPath.startsWith('/knowledge-base/') || normalizedPath.startsWith('/baza-wiedzy/'))) {
    breadcrumbItems.push({
      label: articleTitle,
      href: pathname,
      isCurrentPage: true
    });
  }

  return <Breadcrumb items={breadcrumbItems} locale={locale} />;
}

