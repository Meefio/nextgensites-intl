import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Primary Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Polish', value: 'pl' }
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English Title'
        },
        {
          name: 'pl',
          type: 'string',
          title: 'Polish Title'
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'slug',
          title: 'English Slug',
          options: {
            source: 'title.en',
          },
        },
        {
          name: 'pl',
          type: 'slug',
          title: 'Polish Slug',
          options: {
            source: 'title.pl',
          },
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English Excerpt'
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Polish Excerpt'
        }
      ],
    }),
    defineField({
      name: 'body',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'blockContent',
          title: 'English Content'
        },
        {
          name: 'pl',
          type: 'blockContent',
          title: 'Polish Content'
        }
      ],
    }),
    defineField({
      name: 'mdxContent',
      title: 'MDX Content',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English MDX Content',
          description: 'Content in MDX format (Markdown with React components)'
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Polish MDX Content',
          description: 'Content in MDX format (Markdown with React components)'
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, author, language } = selection
      const localizedTitle = title && title[language || 'en']

      return {
        ...selection,
        title: localizedTitle || (title && Object.values(title)[0]) || 'Untitled',
        subtitle: author && `by ${author} (${language || 'en'})`
      }
    },
  },
})
