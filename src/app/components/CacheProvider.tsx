'use client'

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache
} from '@tanstack/react-query'
import { ReactNode, useState, useEffect } from 'react'

type CacheProviderProps = {
  children: ReactNode
}

export function CacheProvider({ children }: CacheProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Optimize for performance
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        console.error(`Query error: ${error}`)
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error(`Mutation error: ${error}`)
      },
    }),
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && (
        <ReactQueryDevTools />
      )}
    </QueryClientProvider>
  )
}

// Dynamically import ReactQueryDevtools only on client and in development
function ReactQueryDevTools() {
  const [DevTools, setDevTools] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    // Use dynamic import to load the devtools only in development
    import('@tanstack/react-query-devtools').then(module => {
      setDevTools(() => module.ReactQueryDevtools)
    })
  }, []) // Empty dependency array means this runs once on mount

  return DevTools ? <DevTools initialIsOpen={false} position="bottom-right" /> : null
} 
