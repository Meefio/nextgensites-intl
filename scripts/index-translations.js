/**
 * Translation Indexing Script
 * 
 * Run with: node scripts/index-translations.js
 * This script will generate a detailed overview of translation keys
 */

const fs = require('fs');
const path = require('path');

// Configuration
const messagesDir = path.join(process.cwd(), 'messages');
const outputFile = path.join(process.cwd(), 'translation-keys.md');

// Start with the overview
let output = `# Translation Keys Documentation
Generated: ${new Date().toISOString()}

This document provides an overview of all translation keys used in the project.

`;

// Check if messages directory exists
if (!fs.existsSync(messagesDir)) {
  console.error('Messages directory not found at:', messagesDir);
  process.exit(1);
}

// Get all message files
const messageFiles = fs.readdirSync(messagesDir)
  .filter(file => file.endsWith('.json'));

if (messageFiles.length === 0) {
  console.error('No message files found in:', messagesDir);
  process.exit(1);
}

// Parse the first file to get structure (assuming all files have the same structure)
const baseLocale = messageFiles[0];
const baseLocaleName = path.basename(baseLocale, '.json');
const baseMessages = JSON.parse(fs.readFileSync(path.join(messagesDir, baseLocale), 'utf8'));

output += `## Available Locales
The following locales are configured:
${messageFiles.map(file => `- ${path.basename(file, '.json')}`).join('\n')}

## Translation Key Structure
Below is a hierarchical view of all translation keys based on the \`${baseLocaleName}\` locale.

`;

// Function to recursively extract keys
function extractKeys(obj, prefix = '') {
  for (const key in obj) {
    const currentKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // This is a namespace/object
      output += `### ${currentKey}\n`;
      extractKeys(obj[key], currentKey);
    } else {
      // This is a translation value
      const value = obj[key];
      const shortValue = typeof value === 'string'
        ? (value.length > 70 ? value.substring(0, 67) + '...' : value)
        : JSON.stringify(value);

      output += `- \`${currentKey}\`: ${shortValue}\n`;
    }
  }
}

// Extract all keys
extractKeys(baseMessages);

// Add information about how to use these keys
output += `
## How to Use These Keys

### In Server Components
\`\`\`tsx
import {useTranslations} from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('Namespace');
  return <h1>{t('key')}</h1>;
}
\`\`\`

### In Client Components
\`\`\`tsx
'use client';
import {useTranslations} from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations('Namespace');
  return <button onClick={() => alert(t('message'))}>{t('buttonText')}</button>;
}
\`\`\`

### In Server Actions
\`\`\`tsx
import {getTranslations} from 'next-intl/server';

export async function myAction() {
  'use server';
  const t = await getTranslations('Namespace');
  return { message: t('actionComplete') };
}
\`\`\`
`;

// Write the output to a file
fs.writeFileSync(outputFile, output);
console.log(`Translation keys documentation generated at: ${outputFile}`); 
