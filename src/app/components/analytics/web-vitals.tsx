'use client'

import { useEffect, useRef, useState } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import type { Metric } from 'web-vitals'
import { useAnalytics } from './analytics-provider'

// Global cache for metrics (to avoid duplicates)
const metricsCache: Record<string, Metric> = {}

// Function to send metrics to Google Analytics (if available and consent granted)
const sendToAnalytics = (metric: Metric, hasAnalyticsConsent: boolean) => {
  // Skip sending to analytics if not in production mode
  if (process.env.NODE_ENV !== 'production') return

  // Check if gtag is available
  const gtag = typeof window !== 'undefined' ? (window as any).gtag : undefined

  // Only send metrics if user has given consent
  if (!hasAnalyticsConsent) return;

  // Send event to Google Analytics
  if (typeof gtag === 'function') {
    // Use requestIdleCallback or setTimeout to defer analytics
    const sendEvent = () => {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // values must be integers
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
        non_interaction: true // avoids affecting bounce rate
      });
    };

    // Use requestIdleCallback when available, otherwise setTimeout
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => sendEvent());
    } else {
      setTimeout(sendEvent, 0);
    }
  }
}

// Debugging panel component (only for development)
const WebVitalsDebugPanel = () => {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const debugPanelRef = useRef<HTMLDivElement | null>(null)

  // Capture metrics using Next.js built-in hook
  useReportWebVitals((metric) => {
    // Store metric in cache
    metricsCache[metric.id] = metric

    // Log metric in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric)
    }
  })

  // Update metrics periodically
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(Object.values(metricsCache))
    }

    // Update initially and every second
    updateMetrics()
    const interval = setInterval(updateMetrics, 1000)

    return () => clearInterval(interval)
  }, [])

  // Create and manage debug panel
  useEffect(() => {
    // Create panel
    const container = document.createElement('div')
    container.id = 'web-vitals-debug'
    container.style.position = 'fixed'
    container.style.bottom = '0'
    container.style.right = '0'
    container.style.zIndex = '9999'
    container.style.backgroundColor = 'rgba(0,0,0,0.7)'
    container.style.color = 'white'
    container.style.padding = '8px'
    container.style.fontSize = '12px'
    container.style.fontFamily = 'monospace'
    container.style.maxHeight = '100px'
    container.style.overflowY = 'auto'
    container.style.maxWidth = '300px'
    container.style.borderRadius = '4px 0 0 0'
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)'
    container.style.transition = 'opacity 0.3s ease'
    container.style.opacity = '0.7'
    container.style.pointerEvents = 'none'

    // Add hover functionality
    container.addEventListener('mouseenter', () => {
      container.style.opacity = '1'
      container.style.pointerEvents = 'auto'
    })
    container.addEventListener('mouseleave', () => {
      container.style.opacity = '0.7'
      container.style.pointerEvents = 'none'
    })

    // Add close button
    const closeButton = document.createElement('button')
    closeButton.textContent = '×'
    closeButton.style.position = 'absolute'
    closeButton.style.right = '5px'
    closeButton.style.top = '2px'
    closeButton.style.background = 'none'
    closeButton.style.border = 'none'
    closeButton.style.color = 'white'
    closeButton.style.fontSize = '16px'
    closeButton.style.cursor = 'pointer'
    closeButton.style.padding = '0 5px'
    closeButton.addEventListener('click', () => {
      document.body.removeChild(container)
      debugPanelRef.current = null
    })

    container.appendChild(closeButton)
    document.body.appendChild(container)
    debugPanelRef.current = container

    // Cleanup function
    return () => {
      if (debugPanelRef.current && document.body.contains(debugPanelRef.current)) {
        document.body.removeChild(debugPanelRef.current)
        debugPanelRef.current = null
      }
    }
  }, [])

  // Update panel content when metrics change
  useEffect(() => {
    if (!debugPanelRef.current) return

    const container = debugPanelRef.current

    // Create content
    const content = metrics.length === 0
      ? '<div style="margin-top:15px;">Collecting Web Vitals...</div>'
      : '<div style="margin-top:15px;"><strong>Web Vitals</strong></div>' +
      metrics.map(m => {
        const color = m.rating === 'good' ? 'lightgreen' : m.rating === 'needs-improvement' ? 'orange' : 'red'
        return `<div style="margin-top:4px;"><strong>${m.name}</strong>: <span style="color:${color}">${Math.round(m.value)}</span></div>`
      }).join('')

    container.innerHTML = content

    // Re-add close button (since innerHTML replaced it)
    const newCloseButton = document.createElement('button')
    newCloseButton.textContent = '×'
    newCloseButton.style.position = 'absolute'
    newCloseButton.style.right = '5px'
    newCloseButton.style.top = '2px'
    newCloseButton.style.background = 'none'
    newCloseButton.style.border = 'none'
    newCloseButton.style.color = 'white'
    newCloseButton.style.fontSize = '16px'
    newCloseButton.style.cursor = 'pointer'
    newCloseButton.style.padding = '0 5px'
    newCloseButton.addEventListener('click', () => {
      if (debugPanelRef.current && document.body.contains(debugPanelRef.current)) {
        document.body.removeChild(debugPanelRef.current)
        debugPanelRef.current = null
      }
    })

    container.appendChild(newCloseButton)
  }, [metrics])

  return null
}

// Main Web Vitals component
export function WebVitals() {
  const { consentStatus } = useAnalytics();
  const [metricsEnabled, setMetricsEnabled] = useState(false);
  const isProduction = process.env.NODE_ENV === 'production';
  const showDebug = process.env.NODE_ENV === 'development';
  const hasReportedRef = useRef<Set<string>>(new Set());

  // Track consent status
  useEffect(() => {
    setMetricsEnabled(consentStatus.analytics);
  }, [consentStatus.analytics]);

  // Use Next.js built-in hook - always called unconditionally at top level
  useReportWebVitals((metric) => {
    // Skip if we've already reported this metric
    if (hasReportedRef.current.has(metric.id)) return;

    // Store in cache for potential use
    metricsCache[metric.id] = metric;

    // Mark as reported
    hasReportedRef.current.add(metric.id);

    // Only process metrics in production
    if (isProduction) {
      // Use requestIdleCallback or setTimeout to defer processing
      const processMetric = () => {
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
            sendToAnalytics(metric, metricsEnabled);
            break;
          default:
            sendToAnalytics(metric, metricsEnabled);
            break;
        }
      };

      // Use requestIdleCallback when available to avoid impacting performance
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => processMetric());
      } else {
        setTimeout(processMetric, 0);
      }
    } else if (process.env.NODE_ENV === 'development') {
      // Log metric in development
      console.log(metric);
    }
  });

  // In development, render debug panel
  if (showDebug) {
    return <WebVitalsDebugPanel />;
  }

  // In production, render nothing (component handles analytics in the background)
  return null;
} 
