import type { GlobalConfig } from 'payload'

import { CACHE_TAGS } from '../lib/cache.ts'
import { safeRevalidateTag } from '../lib/revalidate.ts'

const pageHeaderFields = (label: string) => [
  { name: 'eyebrow', type: 'text' as const, label: 'Eyebrow Label' },
  { name: 'heading', type: 'text' as const, required: true as const, label: `${label} Page Heading` },
  { name: 'subheading', type: 'textarea' as const, label: 'Sub-heading' },
]

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Page Content',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.content)],
  },
  fields: [
    {
      name: 'services',
      type: 'group',
      label: 'Services Page',
      fields: pageHeaderFields('Services'),
    },
    {
      name: 'work',
      type: 'group',
      label: 'Work / Case Studies Page',
      fields: pageHeaderFields('Work'),
    },
    {
      name: 'blog',
      type: 'group',
      label: 'Blog Page',
      fields: pageHeaderFields('Blog'),
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Page',
      fields: pageHeaderFields('Contact'),
    },
    {
      name: 'about',
      type: 'group',
      label: 'About Page',
      fields: [
        ...pageHeaderFields('About'),
        {
          name: 'mission',
          type: 'textarea',
          label: 'Mission Statement',
        },
        {
          name: 'story',
          type: 'richText',
          label: 'Our Story',
        },
        {
          name: 'values',
          type: 'array',
          label: 'Core Values',
          fields: [
            { name: 'icon', type: 'text', label: 'Icon Name (Lucide)' },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'teamHeading',
          type: 'text',
          label: 'Team Section Heading',
          defaultValue: 'Meet the Team',
        },
        {
          name: 'ctaHeading',
          type: 'text',
          label: 'About Page CTA Heading',
        },
        {
          name: 'ctaSubtext',
          type: 'textarea',
          label: 'About Page CTA Sub-text',
        },
      ],
    },
    {
      name: 'legal',
      type: 'group',
      label: 'Legal Pages',
      fields: [
        {
          name: 'privacyPolicy',
          type: 'richText',
          label: 'Privacy Policy Content',
        },
        {
          name: 'termsOfService',
          type: 'richText',
          label: 'Terms of Service Content',
        },
      ],
    },
  ],
}
