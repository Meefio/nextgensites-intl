import { UserIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Author\'s full name'
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: Rule => Rule.required(),
      description: 'URL-friendly version of the name'
    }),
    defineField({
      name: 'position',
      type: 'object',
      title: 'Position/Title',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English Position',
          validation: Rule => Rule.required()
        },
        {
          name: 'pl',
          type: 'string',
          title: 'Polish Position',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      description: 'Author\'s position or job title'
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      description: 'Author\'s profile photo'
    }),
    defineField({
      name: 'bio',
      type: 'object',
      title: 'Biography',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English Bio',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' }
                ]
              }
            }),
          ],
        },
        {
          name: 'pl',
          type: 'array',
          title: 'Polish Bio',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' }
                ]
              }
            }),
          ],
        }
      ],
      description: 'Author\'s biographical information'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      description: 'Contact email (optional, not displayed publicly)'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn'
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter/X'
        },
        {
          name: 'github',
          type: 'url',
          title: 'GitHub'
        },
        {
          name: 'website',
          type: 'url',
          title: 'Personal Website'
        }
      ],
      description: 'Social media and website links'
    })
  ],
  preview: {
    select: {
      title: 'name',
      position: 'position',
      media: 'image',
    },
    prepare(selection) {
      const { title, position } = selection
      const positionText = position?.en || position?.pl || 'No position'

      return {
        ...selection,
        title: title || 'Unnamed Author',
        subtitle: positionText
      }
    },
  },
})
