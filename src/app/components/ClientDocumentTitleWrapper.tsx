'use client';

import dynamic from 'next/dynamic';

// Dynamically import the title changer component
const BetterTitleChanger = dynamic(
  () => import('./BetterTitleChanger').then(mod => mod.default),
  { ssr: false }
);

interface ClientDocumentTitleWrapperProps {
  defaultTitle?: string;
}

export function ClientDocumentTitleWrapper({ defaultTitle = 'NextGenSites' }: ClientDocumentTitleWrapperProps) {
  // Usuwamy efekt ustawiający tytuł na początku, aby nie nadpisywał tytułu ustawionego przez metadane

  return <BetterTitleChanger defaultTitle={defaultTitle} />;
}

export default ClientDocumentTitleWrapper; 
