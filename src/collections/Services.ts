import type { CollectionConfig } from 'payload'

import { CACHE_TAGS } from '../lib/cache.ts'
import { safeRevalidateTag } from '../lib/revalidate.ts'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'featured', 'status', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.services)],
    afterDelete: [() => safeRevalidateTag(CACHE_TAGS.services)],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'Auto-generated from title. Used in the URL: /services/[slug]',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.['title']) {
              return (data['title'] as string)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: {
        description: 'Shown on service cards (max ~120 chars)',
      },
    },
    {
      name: 'iconName',
      type: 'text',
      label: 'Icon Name (Lucide)',
      admin: {
        description: 'Lucide React icon name, e.g. "Globe", "Code2", "BarChart"',
      },
    },
    {
      name: 'whoIsItFor',
      type: 'textarea',
      label: 'Who Is This For?',
      admin: {
        description: 'e.g. "This is perfect for growing e-commerce brands looking to..."',
      },
    },
    {
      name: 'scope',
      type: 'array',
      label: "Scope (What's Included)",
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits (Transformation)',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Benefit Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Benefit Description',
        },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'finalHookHeading',
      type: 'text',
      label: 'Final Hook Heading',
      admin: {
        description: 'e.g. "Ready to scale your business?"',
      },
    },
    {
      name: 'finalHookCtaText',
      type: 'text',
      label: 'Final Hook CTA Button Text',
      admin: {
        description: "e.g. \"Let's talk\"",
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on Home',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
  timestamps: true,
}
