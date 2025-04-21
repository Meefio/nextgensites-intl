'use client'

import { Pricing } from '../pricing'
import { PromoHeader } from '../promo-header'
import { CountdownTimer } from '../countdown-timer'
import { PriceDisplay } from '../price-display'

export function PricingDemo() {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Pricing Components Demo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">PromoHeader Component</h3>
          <div className="h-16 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <PromoHeader />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">CountdownTimer Component</h3>
          <div className="h-16 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <CountdownTimer />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
        <h3 className="text-xl font-bold mb-4">PriceDisplay Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <h4 className="font-bold mb-2">Basic Plan</h4>
            <PriceDisplay plan={{ 
              key: 'basic', 
              oneTimePrice: '$499 - $999', 
              promoPrice: '$349 - $699' 
            }} />
          </div>
          
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <h4 className="font-bold mb-2">Professional Plan</h4>
            <PriceDisplay plan={{ 
              key: 'professional', 
              oneTimePrice: '$999 - $1999', 
              promoPrice: '$699 - $1399' 
            }} />
          </div>
          
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <h4 className="font-bold mb-2">Premium Plan</h4>
            <PriceDisplay plan={{ 
              key: 'premium', 
              oneTimePrice: 'Custom pricing'
            }} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Full Pricing Section</h3>
        <div className="border rounded-lg overflow-hidden">
          <Pricing />
        </div>
      </div>
    </div>
  )
} 
