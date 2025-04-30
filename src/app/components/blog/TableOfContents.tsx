'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface TOCItem {
  id: string
  title: string
}

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
  locale?: string
}

export const TableOfContents = ({ items, locale, className = '' }: TableOfContentsProps) => {
  const t = useTranslations('BlogComponents')
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items.length) return

    // Set initial active ID to the first item if none is active
    if (!activeId && items.length > 0) {
      setActiveId(items[0].id)
    }

    const observers: IntersectionObserver[] = []
    const observerEntries: { [key: string]: IntersectionObserverEntry } = {}

    // Helper function to determine which section should be active
    const determineActiveSection = () => {
      // Find the first visible section with the highest intersection ratio
      const visibleEntries = Object.values(observerEntries).filter(
        entry => entry.isIntersecting
      )

      if (visibleEntries.length) {
        // Sort by Y position (closest to top of viewport)
        const sortedEntries = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )

        if (sortedEntries.length > 0 && sortedEntries[0].target.id) {
          setActiveId(sortedEntries[0].target.id)
        }
      } else if (items.length > 0 && !activeId) {
        // Default to first item if nothing is visible yet
        setActiveId(items[0].id)
      }
    }

    // Create an observer for each section
    items.forEach(item => {
      const element = document.getElementById(item.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          observerEntries[item.id] = entry
          determineActiveSection()
        },
        {
          rootMargin: '-10% 0px -70% 0px', // Adjust margins to trigger earlier
          threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], // Multiple thresholds for better accuracy
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    // Add scroll event listener for smoother updates
    const handleScroll = () => {
      // Use requestAnimationFrame to limit the number of calculations
      window.requestAnimationFrame(() => {
        determineActiveSection()
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items, activeId])

  return (
    <motion.div
      className={`bg-card border rounded-xl p-5 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
        {t('tableOfContents.title')}
      </h3>

      <nav className="space-y-1.5">
        {items.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`group flex items-center py-2 px-3 text-sm rounded-lg transition-colors hover:bg-muted ${activeId === section.id
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:text-primary'
              }`}
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById(section.id)
              if (element) {
                setActiveId(section.id)
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }}
          >
            <div className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors ${activeId === section.id
              ? 'bg-primary'
              : 'bg-primary/40 group-hover:bg-primary/60'
              }`}></div>
            <span className={activeId === section.id ? '' : 'group-hover:text-primary/90'}>
              {section.title}
            </span>
          </a>
        ))}
      </nav>
    </motion.div>
  )
}

export default TableOfContents 
