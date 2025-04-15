'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Dynamiczne importowanie komponentu zmiany tytułu
const BetterTitleChanger = dynamic(
  () => import('./BetterTitleChanger'),
  { ssr: false }
);

interface ClientDocumentTitleWrapperProps {
  defaultTitle: string;
}

export default function ClientDocumentTitleWrapper({ defaultTitle }: ClientDocumentTitleWrapperProps) {
  // Zabezpieczenie aby tytuł był zawsze ustawiony na początku
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = defaultTitle;
    }
  }, [defaultTitle]);

  return <BetterTitleChanger defaultTitle={defaultTitle} />;
} 
