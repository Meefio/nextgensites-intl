// Simple script to clear MDX cache
// Run with 'node --loader ts-node/esm src/app/[locale]/baza-wiedzy/clear-cache.js'

import fs from 'fs';
import path from 'path';

// Path to cache files (adjust if needed)
const cachePath = path.join(process.cwd(), '.next', 'cache');

if (fs.existsSync(cachePath)) {
  console.log('🗑️ Clearing Next.js cache...');
  try {
    // Delete all files in the cache directory
    deleteDirectory(cachePath);
    console.log('✅ Cache cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
  }
} else {
  console.log('ℹ️ No cache directory found at:', cachePath);
}

// Helper function to delete a directory recursively
function deleteDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach(file => {
      const curPath = path.join(directory, file);

      // If we're in the cache directory but not pages or data, skip
      // This preserves important Next.js cache while clearing MDX cache
      if (directory === cachePath && !['pages', 'data'].includes(file)) {
        return;
      }

      if (fs.lstatSync(curPath).isDirectory()) {
        // Recurse
        deleteDirectory(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });

    // Don't delete the cache directory itself, just its contents
    if (directory !== cachePath) {
      try {
        fs.rmdirSync(directory);
      } catch (e) {
        console.log(`Note: Could not remove directory ${directory}`, e);
      }
    }
  }
} 
