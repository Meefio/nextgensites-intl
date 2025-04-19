'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { useEffect, useState } from 'react'

export function WebVitals() {
  const [metrics, setMetrics] = useState<Array<any>>([])

  useReportWebVitals((metric) => {
    // Log to analytics service
    console.log(metric)

    // Store metrics to state for debugging
    setMetrics((prevMetrics) => [...prevMetrics, metric])

    // You can send these metrics to your analytics service
    // Example for sending to Google Analytics:
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ; (window as any).gtag('event', metric.name, {
        value: metric.value,
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }
  })

  // Add a debug panel for development only
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // Create or get container
    let container = document.getElementById('web-vitals-debug')
    if (!container) {
      container = document.createElement('div')
      container.id = 'web-vitals-debug'
      container.style.position = 'fixed'
      container.style.bottom = '0'
      container.style.right = '0'
      container.style.zIndex = '9999'
      container.style.backgroundColor = 'rgba(0,0,0,0.8)'
      container.style.color = 'white'
      container.style.padding = '10px'
      container.style.fontSize = '12px'
      container.style.fontFamily = 'monospace'
      container.style.maxHeight = '200px'
      container.style.overflowY = 'auto'
      container.style.maxWidth = '400px'
      document.body.appendChild(container)
    }

    // Update content
    if (metrics.length > 0) {
      container.innerHTML = '<h4>Web Vitals</h4>' +
        metrics.map(m => `${m.name}: ${Math.round(m.value)} (${m.rating})`).join('<br>')
    }

    return () => {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }
  }, [metrics])

  return null
} 
