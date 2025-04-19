/**
 * Project Indexing Script
 * 
 * Run with: node scripts/index-project.js
 * This script will generate a detailed project structure document
 */

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

// Configuration
const ignoreDirs = ['.git', '.next', 'node_modules', 'out', 'dist'];
const ignoreFiles = ['.DS_Store', '.env.local'];
const maxDepth = 3; // Maximum directory depth to traverse
const outputFile = path.join(process.cwd(), '.cursor', 'rules', 'project-structure.md');

// Ensure output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, {recursive: true});
  console.log(`Created output directory: ${outputDir}`);
}

// Start with the project overview
let output = `# Project Structure Documentation
Generated: ${new Date().toISOString()}

## Overview
This document provides a detailed overview of the project structure to help with navigation and development.

`;

// Get package information
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  output += `## Project: ${packageJson.name} (${packageJson.version})
${packageJson.description || 'No description provided.'}

### Dependencies
`;

  // Add key dependencies
  const dependencies = {...packageJson.dependencies};
  const devDependencies = {...packageJson.devDependencies};

  if (dependencies && Object.keys(dependencies).length > 0) {
    output += '#### Main Dependencies\n';
    Object.keys(dependencies).forEach(dep => {
      output += `- ${dep}: ${dependencies[dep]}\n`;
    });
    output += '\n';
  }

  if (devDependencies && Object.keys(devDependencies).length > 0) {
    output += '#### Dev Dependencies\n';
    Object.keys(devDependencies)
      .slice(0, 10) // Limit to 10 dev dependencies to avoid too much noise
      .forEach(dep => {
        output += `- ${dep}: ${devDependencies[dep]}\n`;
      });
    if (Object.keys(devDependencies).length > 10) {
      output += `- ... and ${Object.keys(devDependencies).length - 10} more\n`;
    }
    output += '\n';
  }

  // Add scripts
  if (packageJson.scripts && Object.keys(packageJson.scripts).length > 0) {
    output += '### Scripts\n';
    Object.keys(packageJson.scripts).forEach(script => {
      output += `- \`${script}\`: ${packageJson.scripts[script]}\n`;
    });
    output += '\n';
  }
} catch (e) {
  output += '## Package Information\nCould not read package.json\n\n';
}

// Add directory structure
output += '## Directory Structure\n';

// Function to traverse and document the directory structure
function traverseDirectory(dir, depth = 0, prefix = '') {
  if (depth > maxDepth) return;

  const items = fs.readdirSync(dir);

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dir, item);
    const relativePath = path.relative(process.cwd(), itemPath);

    // Skip ignored directories and files
    if (ignoreDirs.includes(item) || ignoreFiles.includes(item)) return;

    // Check if it's a directory
    const stats = fs.statSync(itemPath);
    const isDirectory = stats.isDirectory();

    // Create the line prefix for tree structure
    const linePrefix = prefix + (isLast ? '└── ' : '├── ');
    const nextPrefix = prefix + (isLast ? '    ' : '│   ');

    // Add the line to output
    if (isDirectory) {
      output += `${linePrefix}📁 **${item}/**\n`;
      traverseDirectory(itemPath, depth + 1, nextPrefix);
    } else {
      const extension = path.extname(item);
      let icon = '📄';

      // Add file icon based on extension
      if (['.js', '.jsx', '.ts', '.tsx'].includes(extension)) icon = '📝';
      else if (['.json', '.yaml', '.yml'].includes(extension)) icon = '⚙️';
      else if (['.md', '.mdx'].includes(extension)) icon = '📚';
      else if (['.css', '.scss', '.less'].includes(extension)) icon = '🎨';

      output += `${linePrefix}${icon} ${item}\n`;
    }
  });
}

// Traverse the directory
traverseDirectory(process.cwd());

// Add key files section
output += `
## Key Files
`;

// Try to find key configuration files
const keyFilePaths = [
  'next.config.ts',
  'next.config.js',
  'tailwind.config.ts',
  'tailwind.config.js',
  'src/middleware.ts',
  'src/i18n/routing.ts',
  '.env'
];

keyFilePaths.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    output += `- \`${filePath}\`: Configuration for ${path.basename(filePath).split('.')[0]}\n`;
  }
});

// Write the output to a file
fs.writeFileSync(outputFile, output);
console.log(`Project structure documentation generated at: ${outputFile}`); 
