import React from 'react'
import { Header } from '@/app/components/header'

const PortfolioLayout = ({
  children,
}: {
  children: React.ReactNode
  params: { slug: string }
}) => {
  return (
    <div className="relative">
      <div className='container'>
        <Header />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default PortfolioLayout
