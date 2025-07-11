'use client'

import { Button } from "@/app/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { getLocalizedPath, getPostSlugsClient } from "@/i18n/blog-localization"
import { useEffect, useRef, useState } from "react"

const languages = [
  { code: 'pl', label: 'Polski', countryCode: 'PL', path: '/' },
  { code: 'en', label: 'English', countryCode: 'US', path: '/en' }
]

// Helper function to check if a path is a knowledge base article
const isKnowledgeBaseArticle = (pathname: string): boolean => {
  return pathname.includes('/baza-wiedzy/') || pathname.includes('/knowledge-base/');
}

// Helper function to extract slug and current locale from pathname
const extractSlugAndLocale = (pathname: string): { slug: string; currentLocale: string } | null => {
  let cleanPath = pathname;

  // Remove /en prefix if present
  if (pathname.startsWith('/en/')) {
    cleanPath = pathname.substring(3);
    const currentLocale = 'en';

    // Check if it's a knowledge base article
    if (cleanPath.startsWith('/knowledge-base/')) {
      const slug = cleanPath.substring('/knowledge-base/'.length);
      return { slug, currentLocale };
    }
  } else {
    const currentLocale = 'pl';

    if (cleanPath.startsWith('/baza-wiedzy/')) {
      const slug = cleanPath.substring('/baza-wiedzy/'.length);
      return { slug, currentLocale };
    }
  }

  return null;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const currentLang = pathname.startsWith('/en') ? 'en' : 'pl'
  const currentLanguage = languages.find(lang => lang.code === currentLang)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    // Add event listener only when dropdown is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside, true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [open])

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (open && event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  // Enhanced language switching with dynamic slug mapping
  const handleLanguageSwitch = async (targetLang: { code: string; label: string; countryCode: string; path: string }) => {
    setIsNavigating(true);
    setOpen(false);

    try {
      // Check if current page is a knowledge base article
      if (isKnowledgeBaseArticle(pathname)) {
        const slugInfo = extractSlugAndLocale(pathname);

        if (slugInfo) {
          // Get slug mappings from the API
          const slugMappings = await getPostSlugsClient(slugInfo.slug, slugInfo.currentLocale);

          // Get the target slug for the desired language
          const targetSlug = slugMappings[targetLang.code] || slugInfo.slug;

          // Build the target path
          let targetPath: string;
          if (targetLang.code === 'en') {
            targetPath = `/en/knowledge-base/${targetSlug}`;
          } else {
            targetPath = `/baza-wiedzy/${targetSlug}`;
          }

          // Navigate to the localized article
          router.push(targetPath);
          return;
        }
      }

      // For non-article pages, use the standard localization
      let href: string;

      if (targetLang.code === 'pl') {
        // First get the properly localized path using the existing utility
        const localizedPath = getLocalizedPath(pathname, 'pl');

        // Now prefix it with /pl to trigger our middleware language detection
        // Make sure localizedPath is a string (it always is for Polish locale)
        const pathString = typeof localizedPath === 'string' ? localizedPath : '/pl';

        // Add the /pl prefix for middleware detection
        if (pathString === '/') {
          href = '/pl';
        } else {
          // Add /pl prefix to non-root paths
          href = `/pl${pathString}`;
        }
      } else {
        // For English, use the standard getLocalizedPath function
        href = getLocalizedPath(pathname, targetLang.code);
      }

      // Navigate to the new path
      router.push(href);
    } catch (error) {
      console.error('Error during language switch:', error);

      // Fallback to basic language switching
      let fallbackHref: string;

      if (targetLang.code === 'pl') {
        const localizedPath = getLocalizedPath(pathname, 'pl');
        const pathString = typeof localizedPath === 'string' ? localizedPath : '/pl';

        if (pathString === '/') {
          fallbackHref = '/pl';
        } else {
          fallbackHref = `/pl${pathString}`;
        }
      } else {
        fallbackHref = getLocalizedPath(pathname, targetLang.code);
      }

      router.push(fallbackHref);
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="relative">
      <Button
        ref={triggerRef}
        variant="ghost"
        size="sm"
        className={className}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        disabled={isNavigating}
      >
        {isNavigating ? (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-4 h-4 border border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <ReactCountryFlag
            countryCode={currentLanguage?.countryCode || 'PL'}
            svg
            style={{
              width: '1.5em',
              height: '1.5em',
            }}
            title={currentLanguage?.label}
            alt={`Flaga ${currentLanguage?.label}`}
          />
        )}
      </Button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 z-100 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
        >
          {languages.map((lang) => {
            // Skip rendering the current language option
            if (lang.code === currentLang) {
              return null;
            }

            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSwitch(lang)}
                aria-label={`Zmień język na ${lang.label}`}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                role="menuitem"
                disabled={isNavigating}
              >
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={lang.countryCode}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                    }}
                    title={lang.label}
                    alt={`Flaga ${lang.label}`}
                  />
                  <span>{lang.label}</span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
} 
