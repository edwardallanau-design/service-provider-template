import type { CollectionConfig } from 'payload'

import { CACHE_TAGS } from '../lib/cache.ts'
import { safeRevalidateTag } from '../lib/revalidate.ts'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    group: 'Content',
    defaultColumns: ['clientName', 'clientCompany', 'featured', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.testimonials)],
    afterDelete: [() => safeRevalidateTag(CACHE_TAGS.testimonials)],
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'clientRole',
      type: 'text',
      label: 'Client Role / Title',
    },
    {
      name: 'clientCompany',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
    },
    {
      name: 'measurableResult',
      type: 'text',
      label: 'Measurable Result',
      admin: {
        description: 'e.g. "3x revenue in 6 months" — shown as a highlight stat',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Client Photo',
    },
    {
      name: 'projectRef',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Related Project',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on Home',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
