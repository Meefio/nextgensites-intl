import React from 'react'
import { Header } from '@/app/components/header'
import { Footer } from '@/app/components/footer';

type LayoutProps = {
  children: React.ReactNode;
}

const PortfolioLayout = ({
  children,
}: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default PortfolioLayout
