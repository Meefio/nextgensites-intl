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
      description: 'Primary language for this post'
    }),
    defineField({
      name: 'title',
      type: 'object',
      title: 'Title',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English Title',
          validation: Rule => Rule.required()
        },
        {
          name: 'pl',
          type: 'string',
          title: 'Polish Title',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      description: 'Post title in both languages'
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
            maxLength: 96,
          },
          validation: Rule => Rule.required()
        },
        {
          name: 'pl',
          type: 'slug',
          title: 'Polish Slug',
          options: {
            source: 'title.pl',
            maxLength: 96,
          },
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      description: 'URL-friendly version of the title'
    }),
    defineField({
      name: 'description',
      type: 'object',
      title: 'Meta Description',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English Description',
          rows: 3,
          validation: Rule => Rule.max(160).warning('Keep under 160 characters for SEO')
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Polish Description',
          rows: 3,
          validation: Rule => Rule.max(160).warning('Keep under 160 characters for SEO')
        }
      ],
      description: 'Brief description for SEO and social sharing'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: Rule => Rule.required(),
      description: 'Post author'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
      description: 'When the post was published'
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'number',
      validation: Rule => Rule.min(1).max(60),
      description: 'Estimated reading time in minutes (1-60)'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
      validation: Rule => Rule.required(),
      description: 'Primary category for this post'
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required(),
          description: 'Important for accessibility and SEO'
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption for the image'
        })
      ],
      validation: Rule => Rule.required(),
      description: 'Main image for the post'
    }),
    defineField({
      name: 'excerpt',
      type: 'object',
      title: 'Excerpt',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English Excerpt',
          rows: 4,
          validation: Rule => Rule.max(300)
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Polish Excerpt',
          rows: 4,
          validation: Rule => Rule.max(300)
        }
      ],
      description: 'Short excerpt shown in post listings'
    }),
    defineField({
      name: 'summaryPoints',
      type: 'object',
      title: 'Summary Points',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English Summary Points',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(6)
        },
        {
          name: 'pl',
          type: 'array',
          title: 'Polish Summary Points',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(6)
        }
      ],
      description: 'Key points covered in the article (max 6)'
    }),
    defineField({
      name: 'worthKnowing',
      type: 'object',
      title: 'Worth Knowing',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English Worth Knowing',
          rows: 3
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Polish Worth Knowing',
          rows: 3
        }
      ],
      description: 'Important insight or fact highlighted in the article'
    }),
    defineField({
      name: 'content',
      type: 'object',
      title: 'Article Content',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'English Content (MDX)',
          description: 'Full article content in MDX format'
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Polish Content (MDX)',
          description: 'Full article content in MDX format'
        }
      ],
      description: 'Main article content in MDX format'
    }),
    defineField({
      name: 'contentImages',
      title: 'Content Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            },
            {
              name: 'filename',
              type: 'string',
              title: 'Reference Filename',
              description: 'Filename to reference in MDX content (e.g., web-app-img1-en.png)',
              validation: Rule => Rule.required()
            }
          ]
        })
      ],
      description: 'Images used within the article content - reference by filename in MDX'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.max(10),
      description: 'Keywords and tags for better categorization (max 10)'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage'
    }),
    defineField({
      name: 'seoKeywords',
      type: 'object',
      title: 'SEO Keywords',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English Keywords',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(10)
        },
        {
          name: 'pl',
          type: 'array',
          title: 'Polish Keywords',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(10)
        }
      ],
      description: 'SEO keywords for search optimization (max 10 each)'
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft',
      validation: Rule => Rule.required(),
      description: 'Current status of the post'
    })
  ],
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Publication Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title.en', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      author: 'author.name',
      media: 'coverImage',
      status: 'status',
      publishedAt: 'publishedAt'
    },
    prepare(selection) {
      const { title, author, language, status, publishedAt } = selection
      const localizedTitle = title && title[language || 'en']
      const statusEmoji = status === 'published' ? '✅' : status === 'draft' ? '📝' : '📦'
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'

      return {
        ...selection,
        title: `${statusEmoji} ${localizedTitle || (title && Object.values(title)[0]) || 'Untitled'}`,
        subtitle: `${author} • ${date} • ${language || 'en'}`
      }
    },
  },
})
