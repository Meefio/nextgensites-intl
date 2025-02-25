'use client'

import { Button } from "@/app/components/ui/button"
import { Link } from "@/i18n/routing"
import { usePathname } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

const languages = [
  { code: 'pl', label: 'Polski', countryCode: 'PL', path: '/' },
  { code: 'en', label: 'English', countryCode: 'US', path: '/en' }
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/en') ? 'en' : 'pl'
  const currentLanguage = languages.find(lang => lang.code === currentLang)

  const currentPath = pathname
    .replace(/^\/en/, '')
    || '/'

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
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild>
            <Link
              href={currentPath as any}
              locale={lang.code}
              aria-label={`Zmień język na ${lang.label}`}
            >
              <div className="flex items-center gap-2">
                <ReactCountryFlag
                  countryCode={lang.countryCode}
                  svg
                  style={{
                    width: '1.2em',
                    height: '1.2em',
                  }}
                />
                <span>{lang.label}</span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
