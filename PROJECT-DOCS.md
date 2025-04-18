# Project Documentation Guide

This repository includes several documentation files to help you navigate and understand the project structure.

## Documentation Files

1. **project-index.md** - A high-level overview of the project, its dependencies, and best practices.

2. **project-structure.md** - Detailed documentation of the project structure, generated automatically.

3. **translation-keys.md** - A comprehensive list of translation keys used in the project.

## How to Use

### For Project Overview

Read `project-index.md` for a quick understanding of:
- Key technologies used
- Directory structure
- Build commands
- Best practices

### For Detailed Structure

Use `project-structure.md` to understand:
- Complete directory tree
- Dependencies
- Key configuration files

### For Translations

Use `translation-keys.md` to:
- See all available translations
- Understand the translation key hierarchy
- Learn how to implement translations in different contexts

## Regenerating Documentation

To regenerate the documentation, run:

```bash
# Generate project structure documentation
node scripts/index-project.js

# Generate translations documentation
node scripts/index-translations.js
```

## Best Practices

1. **Keep Documentation Updated** - After making significant changes to the project structure or translations, regenerate the documentation.

2. **Reference Documentation** - When working on the project, refer to these documentation files to understand conventions and patterns.

3. **Send Documentation Links** - When sharing the project with someone new, point them to these documentation files first. 
