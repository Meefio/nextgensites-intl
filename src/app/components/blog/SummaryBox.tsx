'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React from 'react'

interface SummaryBoxProps {
  points?: string[]
  locale?: string
  className?: string
  children?: React.ReactNode
}

export const SummaryBox = ({ points, className = '', children }: SummaryBoxProps) => {
  const t = useTranslations('BlogComponents')

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Animation variants for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  // Extract points from children if provided as MDX content
  const getPointsFromChildren = () => {
    if (!children) return []

    // If children is a string, split it by newlines and filter empty lines
    if (typeof children === 'string') {
      return children
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim())
        .filter(Boolean)
    }

    // Handle MDX parsed content which might be in various formats
    const extractPointsFromReactNode = (node: React.ReactNode): string[] => {
      // If it's a string with list items
      if (typeof node === 'string' && node.includes('-')) {
        return node
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-'))
          .map(line => line.substring(1).trim())
          .filter(Boolean)
      }

      // If it's a React element
      if (React.isValidElement(node)) {
        // If it's a list element (ul/ol)
        if (node.type === 'ul' || node.type === 'ol') {
          // Type assertion to inform TypeScript that props has the children property
          const nodeProps = node.props as { children?: React.ReactNode };

          // Now safely access the children property with proper type checking
          return React.Children.toArray(nodeProps.children)
            .filter(child => React.isValidElement(child) && child.type === 'li')
            .map(child => {
              if (React.isValidElement(child)) {
                // Use type assertion for child.props as well
                const childProps = child.props as { children?: React.ReactNode };

                if (typeof childProps.children === 'string') {
                  return childProps.children.trim();
                }
                // Handle nested content in li
                if (React.isValidElement(childProps.children) || Array.isArray(childProps.children)) {
                  return React.Children.toArray(childProps.children)
                    .map(c => typeof c === 'string' ? c.trim() : 'Item')
                    .join(' ');
                }
              }
              return 'Item';
            })
            .filter(Boolean);
        }

        // Handle paragraphs or other elements that might contain list items
        // Use type assertion here too
        const nodeProps = node.props as { children?: React.ReactNode };

        if (nodeProps.children) {
          if (typeof nodeProps.children === 'string' && nodeProps.children.includes('-')) {
            return extractPointsFromReactNode(nodeProps.children);
          }

          // Recursive handling for nested elements
          if (Array.isArray(nodeProps.children)) {
            return nodeProps.children.flatMap(child => extractPointsFromReactNode(child));
          }
        }
      }

      // Handle arrays of nodes
      if (Array.isArray(node)) {
        return node.flatMap(child => extractPointsFromReactNode(child))
      }

      return []
    }

    return extractPointsFromReactNode(children)
  }

  // Use provided points or extract from children
  const pointsToRender = points && points.length > 0
    ? points
    : getPointsFromChildren()

  // If no points are available, don't render anything
  if (!pointsToRender || pointsToRender.length === 0) {
    // Fallback to a defensive render if we can't extract points but have children
    if (children) {
      return (
        <motion.div
          className={`my-8 p-6 border border-border rounded-xl bg-card shadow-sm ${className}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
            {t('summary.title')}
          </h3>

          {children}
        </motion.div>
      )
    }
    return null
  }

  return (
    <motion.div
      className={`my-8 p-6 border border-border rounded-xl bg-card shadow-sm ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
        {t('summary.title')}
      </h3>

      <ul className="space-y-3">
        {pointsToRender.map((point, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-3"
            variants={itemVariants}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default SummaryBox 
