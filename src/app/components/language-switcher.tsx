'use client'

import { Button } from "@/app/components/ui/button"
import { usePathname } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { getLocalizedPath } from "@/i18n/blog-localization"

const languages = [
  { code: 'pl', label: 'Polski', countryCode: 'PL', path: '/' },
  { code: 'en', label: 'English', countryCode: 'US', path: '/en' }
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/en') ? 'en' : 'pl'
  const currentLanguage = languages.find(lang => lang.code === currentLang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => {
          // Skip rendering the current language option
          if (lang.code === currentLang) {
            return null;
          }

          // Get the localized path based on language
          let href;

          if (lang.code === 'pl') {
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
            href = getLocalizedPath(pathname, lang.code);
          }

          return (
            <DropdownMenuItem key={lang.code} asChild className="cursor-pointer">
              <a href={href.toString()} aria-label={`Zmień język na ${lang.label}`}>
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
              </a>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
