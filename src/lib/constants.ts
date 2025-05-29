// Website domain without trailing slash
export const DOMAIN = 'https://nextgensites.pl';

// Locales
export const LOCALES = {
  PL: 'pl',
  EN: 'en',
};

// Default locale
export const DEFAULT_LOCALE = LOCALES.PL;

// Base paths for knowledge base
export const KNOWLEDGE_BASE_PATHS = {
  PL: '/baza-wiedzy',
  EN: '/knowledge-base',
};

// Sanity config
export const SANITY = {
  PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  API_VERSION: '2025-05-21',
}; 
