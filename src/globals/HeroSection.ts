import type { GlobalConfig } from 'payload'

import { CACHE_TAGS } from '../lib/cache.ts'
import { safeRevalidateTag } from '../lib/revalidate.ts'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Home Hero',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.hero)],
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      admin: {
        description: 'Small label above the headline, e.g. "Trusted by 50+ businesses"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Scale Your Business Without the Burnout.',
    },
    {
      name: 'headingHighlight',
      type: 'text',
      label: 'Heading Highlight',
      admin: {
        description: 'Part of the heading to render with accent treatment (must match a substring of heading)',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Sub-headline',
      admin: {
        description: 'Briefly explain how you do it and who it is for',
      },
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        { name: 'text', type: 'text', defaultValue: 'Book Your Audit' },
        { name: 'href', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        { name: 'text', type: 'text', defaultValue: 'View Our Work' },
        { name: 'href', type: 'text', defaultValue: '/work' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (optional)',
    },
  ],
}
