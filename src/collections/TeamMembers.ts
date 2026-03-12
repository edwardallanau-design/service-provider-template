import type { CollectionConfig } from 'payload'

import { CACHE_TAGS } from '../lib/cache.ts'
import { safeRevalidateTag } from '../lib/revalidate.ts'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'role', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.team)],
    afterDelete: [() => safeRevalidateTag(CACHE_TAGS.team)],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Job Title / Role',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'twitter', type: 'text', label: 'Twitter / X URL' },
        { name: 'github', type: 'text', label: 'GitHub URL' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
