'use client'

import { ReactNode, Suspense } from 'react'
import dynamic from 'next/dynamic'

// Use optimized dynamic imports with explicit ssr:false to avoid RSC issues
const CookieBanner = dynamic(() => import('@/app/components/cookie-banner').then(mod => mod.CookieBanner), {
  ssr: false,
  loading: () => null
})

const ScrollToTop = dynamic(() => import('@/app/components/ScrollToTop').then(mod => mod.ScrollToTop), {
  ssr: false,
  loading: () => null
})

// Use a separate dynamic import for the title component to avoid hydration issues
const ClientDocumentTitleWrapper = dynamic(
  () => import('@/app/components/ClientDocumentTitleWrapper').then(mod => mod.default),
  {
    ssr: false,
    loading: () => null
  }
)

// Optimized WebVitals component that only loads in production with minimal overhead
const WebVitals = process.env.NODE_ENV === 'production'
  ? dynamic(() => import('@/app/components/analytics/web-vitals').then(mod => mod.WebVitals), {
    ssr: false,
    loading: () => null,
  })
  : () => null

type ClientWrapperProps = {
  children: ReactNode
  defaultTitle?: string
}

export function ClientWrapper({ children, defaultTitle }: ClientWrapperProps) {
  return (
    <>
      {/* Wrap title component in Suspense to ensure it doesn't block rendering */}
      <Suspense fallback={null}>
        <ClientDocumentTitleWrapper defaultTitle={defaultTitle} />
      </Suspense>

      {children}

      {/* Add suspense boundaries for non-critical UI components */}
      <Suspense fallback={null}>
        <WebVitals />
      </Suspense>

      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>

      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </>
  )
} 
