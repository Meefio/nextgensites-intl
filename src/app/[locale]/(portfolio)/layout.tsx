import React from 'react'
import { Header } from '@/app/components/header'

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
