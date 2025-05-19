'use client'

import { useEffect, useRef, useState } from 'react'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from 'web-vitals'

// Global cache for metrics (to avoid duplicates)
const metricsCache: Record<string, Metric> = {}

// Function to send metrics to Google Analytics (if available and consent granted)
const sendToAnalytics = (metric: Metric) => {
  // Skip sending to analytics if not in production mode
  if (process.env.NODE_ENV !== 'production') return

  // Check if gtag is available
  const gtag = (window as any).gtag
  if (typeof gtag !== 'function') return

  // Check for analytics consent before sending
  const checkConsent = () => {
    // Try to get consent from cookie
    try {
      const cookieMatch = document.cookie.match(/cookieConsent=([^;]+)/);
      if (cookieMatch) {
        const consent = JSON.parse(decodeURIComponent(cookieMatch[1]));
        return consent?.analytics === true;
      }
    } catch (e) {
      console.error('Error checking consent:', e);
    }

    // Fallback to localStorage
    try {
      const localConsent = localStorage.getItem('cookieConsent');
      if (localConsent) {
        const consent = JSON.parse(localConsent);
        return consent?.analytics === true;
      }
    } catch (e) {
      console.error('Error checking local consent:', e);
    }

    // Default to no consent
    return false;
  };

  // Only send metrics if user has given consent
  if (!checkConsent()) return;

  // Send to Google Analytics
  gtag('event', metric.name, {
    value: metric.delta,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating
  })
}

// Helper to report web vitals
const reportWebVitals = () => {
  // Skip reporting if not in production
  if (process.env.NODE_ENV !== 'production') return

  onCLS(sendToAnalytics)
  onFID(sendToAnalytics)
  onLCP(sendToAnalytics)
  onFCP(sendToAnalytics)
  onINP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}

// Debugging panel component (only for development)
const WebVitalsDebugPanel = () => {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const debugPanelRef = useRef<HTMLDivElement | null>(null)

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
  // Early return if not in production - don't even set up listeners
  if (process.env.NODE_ENV !== 'production') {
    // Show debug panel only in development
    if (process.env.NODE_ENV === 'development') {
      return <WebVitalsDebugPanel />
    }
    return null;
  }

  const [consentListener, setConsentListener] = useState(false);
  const reported = useRef(false)

  // Initialize web vitals measurement
  useEffect(() => {
    if (reported.current) return
    reported.current = true
    reportWebVitals()
  }, [])

  // Add listener for consent changes to re-initialize reporting
  useEffect(() => {
    if (consentListener) return;

    const handleConsentChange = () => {
      // Re-initialize reporting when consent changes
      reportWebVitals();
    };

    window.addEventListener('cookieConsentChange', handleConsentChange);
    setConsentListener(true);

    return () => {
      window.removeEventListener('cookieConsentChange', handleConsentChange);
    };
  }, [consentListener]);

  return null;
} 
