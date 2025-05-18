'use client'

import { Button } from "@/app/components/ui/button"
import { usePathname } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { getLocalizedPath } from "@/i18n/blog-localization"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const languages = [
  { code: 'pl', label: 'Polski', countryCode: 'PL', path: '/' },
  { code: 'en', label: 'English', countryCode: 'US', path: '/en' }
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/en') ? 'en' : 'pl'
  const currentLanguage = languages.find(lang => lang.code === currentLang)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

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
      >
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

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 z-[100] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
        >
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
              <Link
                key={lang.code}
                href={href.toString()}
                aria-label={`Zmień język na ${lang.label}`}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setOpen(false)}
                role="menuitem"
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
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
} 
