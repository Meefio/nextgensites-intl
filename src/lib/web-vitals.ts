type WebVitalsMetric = {
  id: string
  startTime: number
  value: number
} & (
    | {
      name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP'
      label: 'web-vital'
      entries: PerformanceEntry[]
      delta: number
      rating: 'good' | 'needs-improvement' | 'poor'
      navigationType: 'navigate' | 'reload' | 'back-forward' | 'prerender'
    }
    | {
      name:
      | 'Next.js-hydration'
      | 'Next.js-route-change-to-render'
      | 'Next.js-render'
      label: 'custom'
      entries: PerformanceEntry[]
    }
  )

const getAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    const savedConsent = localStorage.getItem('cookie_consent')
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent)
      return !!parsed.analytics
    }
  } catch (e) {
    console.error('Error parsing cookie consent', e)
  }
  return false
}

const sendToAnalytics = (metric: WebVitalsMetric) => {
  const hasAnalyticsConsent = getAnalyticsConsent()
  if (!hasAnalyticsConsent || process.env.NODE_ENV !== 'production') {
    return
  }

  const gtag = typeof window !== 'undefined' ? (window as any).gtag : undefined

  if (typeof gtag === 'function') {
    const gtagPayload: { [key: string]: any } = {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      metric_id: metric.id,
      metric_value: metric.value,
      non_interaction: true,
    }

    if (metric.label === 'web-vital') {
      gtagPayload.metric_delta = metric.delta
      gtagPayload.metric_rating = metric.rating
    }

    const sendEvent = () => {
      gtag('event', metric.name, gtagPayload)
    }

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(sendEvent)
    } else {
      setTimeout(sendEvent, 0)
    }
  }
}

export function reportWebVitals(metric: WebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
    case 'LCP':
    case 'CLS':
    case 'FID':
    case 'TTFB':
    case 'INP':
    case 'Next.js-hydration':
    case 'Next.js-route-change-to-render':
    case 'Next.js-render':
      sendToAnalytics(metric)
      break
    default:
      break
  }
} 
