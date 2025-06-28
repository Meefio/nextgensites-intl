import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const contentImageType = defineType({
  name: 'contentImage',
  title: 'Content Image',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Descriptive title for the image'
    }),
    defineField({
      name: 'filename',
      title: 'Reference Filename',
      type: 'string',
      validation: Rule => Rule.required().regex(
        /^[a-z0-9-]+\.(jpg|jpeg|png|webp)$/,
        'Must be lowercase, use hyphens, and end with .jpg, .jpeg, .png, or .webp'
      ),
      description: 'Filename to reference in MDX (e.g., web-app-img1-en.png)'
    }),
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required(),
          description: 'Important for accessibility and SEO'
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption text'
        }
      ],
      validation: Rule => Rule.required(),
      description: 'The actual image file'
    }),
    defineField({
      name: 'category',
      title: 'Image Category',
      type: 'string',
      options: {
        list: [
          { title: 'Blog Content', value: 'blog' },
          { title: 'UI Screenshot', value: 'ui' },
          { title: 'Diagram', value: 'diagram' },
          { title: 'Photo', value: 'photo' },
          { title: 'Illustration', value: 'illustration' }
        ]
      },
      description: 'Category for better organization'
    })
  ],
  preview: {
    select: {
      title: 'title',
      filename: 'filename',
      media: 'image',
      category: 'category'
    },
    prepare(selection) {
      const { title, filename, category } = selection

      return {
        ...selection,
        title: title || 'Untitled Image',
        subtitle: `${filename} • ${category || 'No category'}`
      }
    },
  },
}) 
