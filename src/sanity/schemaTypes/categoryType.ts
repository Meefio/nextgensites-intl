import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'object',
      title: 'Category Name',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English Name',
          validation: Rule => Rule.required()
        },
        {
          name: 'pl',
          type: 'string',
          title: 'Polish Name',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      description: 'Category name in both languages'
    }),
    defineField({
      name: 'slug',
      type: 'object',
      title: 'URL Slug',
      fields: [
        {
          name: 'en',
          type: 'slug',
          title: 'English Slug',
          options: {
            source: 'title.en',
            maxLength: 50,
          },
          validation: Rule => Rule.required()
        },
        {
          name: 'pl',
          type: 'slug',
          title: 'Polish Slug',
          options: {
            source: 'title.pl',
            maxLength: 50,
          },
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      description: 'URL-friendly version of the category name'
    }),
    defineField({
      name: 'description',
      type: 'object',
      title: 'Description',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English Description',
          rows: 3
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Polish Description',
          rows: 3
        }
      ],
      description: 'Optional description of the category'
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: '#3B82F6' },
          { title: 'Green', value: '#10B981' },
          { title: 'Purple', value: '#8B5CF6' },
          { title: 'Red', value: '#EF4444' },
          { title: 'Orange', value: '#F59E0B' },
          { title: 'Pink', value: '#EC4899' },
          { title: 'Teal', value: '#14B8A6' },
          { title: 'Indigo', value: '#6366F1' }
        ]
      },
      initialValue: '#3B82F6',
      description: 'Color used for category badges and highlights'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying categories (lower numbers first)'
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Name A-Z',
      name: 'titleAsc',
      by: [{ field: 'title.en', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
      order: 'order'
    },
    prepare(selection) {
      const { title, color, order } = selection
      const englishTitle = title?.en || 'Untitled'
      const polishTitle = title?.pl || 'Bez tytułu'

      return {
        title: `${englishTitle} / ${polishTitle}`,
        subtitle: `Order: ${order || 'No order'} • Color: ${color || 'Default'}`,
        media: TagIcon
      }
    },
  },
})
