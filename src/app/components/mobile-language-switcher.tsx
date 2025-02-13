'use client'

import { Link } from "@/i18n/routing"
import { usePathname } from "next/navigation"
import ReactCountryFlag from "react-country-flag"

const languages = [
  { code: 'pl', label: 'Polski', countryCode: 'PL' },
  { code: 'en', label: 'English', countryCode: 'US' }
]

export function MobileLanguageSwitcher() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/en') ? 'en' : 'pl'
  
  // Usuń prefix językowy ze ścieżki
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'

  return (
    <div className="border-t border-border mt-4 pt-4">
      <div className="px-2 text-sm text-muted-foreground mb-2">
        Język / Language
      </div>
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={pathWithoutLocale}
          locale={lang.code}
          className={`flex w-full cursor-pointer items-center rounded-md p-2 font-medium ${
            currentLang === lang.code ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
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
      ))}
    </div>
  )
} 
