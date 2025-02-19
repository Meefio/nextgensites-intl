import React from 'react'
import { Header } from '@/app/components/header'

const PortfolioLayout = ({
  children,
}: {
  children: React.ReactNode
  params?: { locale: string }
}) => {
  return (
    <div className="relative">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default PortfolioLayout
