'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface MouseTrackImageProps {
  src: string
  alt: string
  width: number
  height: number
  title: string
  quality?: number
  sizes?: string
  priority?: boolean
}

export function MouseTrackImage({
  src,
  alt,
  width,
  height,
  title,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
}: MouseTrackImageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        title={title}
        height={height}
        quality={quality}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  )
} 
