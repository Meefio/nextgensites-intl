'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TOCItem {
  id: string
  title: string
}

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
  locale: 'en' | 'pl'
}

export const TableOfContents = ({
  items,
  className = '',
  locale
}: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // Helper function to normalize/slugify a string the same way rehype-slug does
  const slugifyText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD') // Unicode normalization
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
      .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric except spaces and hyphens
      .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single one
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  // A function to find a heading element by its text content
  const findHeadingByText = (text: string): HTMLElement | null => {
    const h2Elements = document.querySelectorAll('h2')
    for (const h2 of h2Elements) {
      if (h2.textContent?.trim() === text) {
        return h2
      }
    }
    return null
  }

  useEffect(() => {
    if (!items.length) return

    // Set initial active ID to the first item if none is active
    if (!activeId && items.length > 0) {
      setActiveId(items[0].id)
    }

    const observers: IntersectionObserver[] = []
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const id = entry.target.id

        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(id))
        } else {
          setVisibleSections(prev => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
          })
        }
      })
    }

    // Create an observer for each section
    items.forEach(item => {
      // First try to find by direct text match (most reliable)
      let element = findHeadingByText(item.title)

      // If not found by text, try by expected ID
      if (!element) {
        const slugifiedId = slugifyText(item.title)
        element = document.getElementById(slugifiedId)
      }

      // Last resort - try to find by the item.id provided
      if (!element && item.id) {
        element = document.getElementById(item.id)
      }

      if (!element) {
        return
      }

      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: '-10% 0px -70% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
      })

      observer.observe(element)
      observers.push(observer)
    })

    // Update active section based on visible sections
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        if (visibleSections.size === 0) return

        // Find the first visible section that matches our items
        const visibleIds = Array.from(visibleSections)

        // Try to match by text first
        const visibleHeadings = Array.from(document.querySelectorAll('h2'))
          .filter(h2 => visibleIds.includes(h2.id))
          .map(h2 => h2.textContent?.trim() || '')

        for (const item of items) {
          if (visibleHeadings.includes(item.title)) {
            setActiveId(item.id)
            return
          }

          // If no match by text, try by slugified ID
          const slugifiedId = slugifyText(item.title)
          if (visibleIds.includes(slugifiedId)) {
            setActiveId(item.id)
            return
          }
        }

        // If still no match, use the first visible ID
        if (visibleIds.length > 0 && visibleHeadings.length > 0) {
          const firstVisibleText = visibleHeadings[0]
          const matchingItem = items.find(item => item.title === firstVisibleText)

          if (matchingItem) {
            setActiveId(matchingItem.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Call once to initialize
    handleScroll()

    // Cleanup observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [items, activeId, visibleSections])

  const handleClick = (e: React.MouseEvent, section: TOCItem) => {
    e.preventDefault()

    // First try to find the element by exact text content (most reliable)
    let element = findHeadingByText(section.title)

    // If not found by text, try by expected slugified ID
    if (!element) {
      const slugifiedId = slugifyText(section.title)
      element = document.getElementById(slugifiedId)
    }

    // Last resort - try by the provided ID
    if (!element && section.id) {
      element = document.getElementById(section.id)
    }

    if (element) {
      setActiveId(section.id)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      // Emergency fallback - try to find by innerText match (partial)
      const allHeadings = document.querySelectorAll('h2')
      for (const heading of allHeadings) {
        if (
          heading.innerText.includes(section.title) ||
          section.title.includes(heading.innerText)
        ) {
          heading.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          setActiveId(section.id)
          break
        }
      }
    }
  }

  return (
    <motion.div
      className={`bg-card border rounded-xl p-5 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-1 h-5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
        {locale === 'pl' ? 'Spis treści' : 'Table of contents'}
      </h3>

      <nav className="space-y-1.5">
        {items.map(section => {
          // Get the properly slugified ID for the href
          const slugifiedId = slugifyText(section.title)

          return (
            <a
              key={section.id}
              href={`#${slugifiedId}`}
              className={`group flex items-center py-2 px-3 text-sm rounded-lg transition-colors hover:bg-muted ${activeId === section.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:text-primary'
                }`}
              onClick={e => handleClick(e, section)}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors flex-shrink-0 ${activeId === section.id
                  ? 'bg-primary'
                  : 'bg-primary/40 group-hover:bg-primary/60'
                  }`}
              ></div>
              <span className={activeId === section.id ? '' : 'group-hover:text-primary/90'}>
                {section.title}
              </span>
            </a>
          )
        })}
      </nav>
    </motion.div>
  )
}

export default TableOfContents 
