import React from 'react'
import { Header } from '@/app/components/header'

type LayoutProps = {
  children: React.ReactNode;
}

const PortfolioLayout = ({
  children,
}: LayoutProps) => {
  return (
    <>
      <div className='container'>
        <Header />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </>
  )
}

export default PortfolioLayout
