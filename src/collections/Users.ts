import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
  timestamps: true,
}
