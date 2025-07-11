'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionPositions = useRef<{ id: string; top: number }[]>([]);
  const ticking = useRef(false);

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

  // Oblicz pozycje sekcji tylko przy zmianie items lub resize
  useEffect(() => {
    const calculateSectionPositions = () => {
      sectionPositions.current = items.map(item => {
        const element = findHeadingByText(item.title) || document.getElementById(slugifyText(item.title)) || (item.id && document.getElementById(item.id));
        return {
          id: item.id,
          top: element ? element.getBoundingClientRect().top + window.scrollY : 0
        };
      });
    };
    calculateSectionPositions();
    window.addEventListener('resize', calculateSectionPositions);
    return () => {
      window.removeEventListener('resize', calculateSectionPositions);
    };
  }, [items]);

  // Scroll callback korzysta tylko z sectionPositions
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const offset = 120; // header + margin
          let currentId = null;
          for (let i = sectionPositions.current.length - 1; i >= 0; i--) {
            if (scrollY + offset >= sectionPositions.current[i].top) {
              currentId = sectionPositions.current[i].id;
              break;
            }
          }
          setActiveId(prev => (prev !== currentId ? currentId : prev));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

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
      const header = document.getElementById('main-header');
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Emergency fallback - try to find by innerText match (partial)
      const allHeadings = document.querySelectorAll('h2')
      for (const heading of allHeadings) {
        if (
          heading.innerText.includes(section.title) ||
          section.title.includes(heading.innerText)
        ) {
          const header = document.getElementById('main-header');
          const headerHeight = header ? header.offsetHeight : 80;
          const elementPosition = heading.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          setActiveId(section.id)
          break
        }
      }
    }
  }

  return (
    <motion.div
      className={`bg-card border rounded-xl p-5 shadow-xs ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-1 h-5 bg-primary rounded-full mr-2 shrink-0"></span>
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
                className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors shrink-0 ${activeId === section.id
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
