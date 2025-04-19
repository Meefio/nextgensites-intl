'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const CookieBanner = dynamic(() => import('@/app/components/cookie-banner').then(mod => mod.CookieBanner), { ssr: false })
const ScrollToTop = dynamic(() => import('@/app/components/ScrollToTop').then(mod => mod.ScrollToTop), { ssr: false })
const ClientDocumentTitleWrapper = dynamic(() => import('@/app/components/ClientDocumentTitleWrapper'), { ssr: false })
const WebVitals = dynamic(() => import('@/app/components/analytics/web-vitals').then(mod => mod.WebVitals), { ssr: false })

type ClientWrapperProps = {
  children: ReactNode
  defaultTitle?: string
}

export function ClientWrapper({ children, defaultTitle }: ClientWrapperProps) {
  return (
    <>
      <ClientDocumentTitleWrapper defaultTitle={defaultTitle} />
      <WebVitals />
      {children}
      <CookieBanner />
      <ScrollToTop />
    </>
  )
} 
