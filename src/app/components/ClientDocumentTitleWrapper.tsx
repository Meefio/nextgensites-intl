'use client';

import dynamic from 'next/dynamic';

// Dynamiczne importowanie komponentu zmiany tytułu
const BetterTitleChanger = dynamic(
  () => import('./BetterTitleChanger'),
  { ssr: false }
);

interface ClientDocumentTitleWrapperProps {
  defaultTitle: string;
}

export default function ClientDocumentTitleWrapper({ defaultTitle }: ClientDocumentTitleWrapperProps) {
  // Usuwamy efekt ustawiający tytuł na początku, aby nie nadpisywał tytułu ustawionego przez metadane

  return <BetterTitleChanger defaultTitle={defaultTitle} />;
} 
