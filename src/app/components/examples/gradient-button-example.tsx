import { Button } from "../ui/button";
import { GradientButton } from "../ui/gradient-button";

export function GradientButtonExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Przyciski z gradientem</h3>
          <div className="flex flex-wrap gap-4">
            <GradientButton>Domyślny gradient</GradientButton>
            <GradientButton
              gradientFrom="from-blue-500"
              gradientTo="to-purple-600"
            >
              Niestandardowy gradient
            </GradientButton>
            <GradientButton
              gradientFrom="from-rose-500"
              gradientTo="to-orange-500"
            >
              Ciepły gradient
            </GradientButton>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Rozmiary przycisków</h3>
          <div className="flex flex-wrap items-center gap-4">
            <GradientButton size="sm">Mały</GradientButton>
            <GradientButton>Domyślny</GradientButton>
            <GradientButton size="lg">Duży</GradientButton>
            <GradientButton size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </GradientButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Warianty przycisków</h3>
          <div className="flex flex-wrap gap-4">
            <GradientButton variant="default">Domyślny</GradientButton>
            <GradientButton variant="outline">Outline</GradientButton>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">Standardowy gradient (Button)</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="gradient">Variant z gradientem</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
