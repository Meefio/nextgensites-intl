import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { contentImageType } from './contentImageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    postType,
    authorType,
    categoryType,
    contentImageType,

    // Object types
    blockContentType,
  ],
}
