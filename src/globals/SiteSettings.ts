import type { GlobalConfig } from 'payload'

import { CACHE_TAGS } from '../lib/cache.ts'
import { safeRevalidateTag } from '../lib/revalidate.ts'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [() => safeRevalidateTag(CACHE_TAGS.settings)],
  },
  fields: [
    {
      name: 'branding',
      type: 'group',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          required: true,
          defaultValue: 'Your Company',
        },
        {
          name: 'tagline',
          type: 'text',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Services', href: '/services' },
        { label: 'Work', href: '/work' },
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea' },
        {
          name: 'socialLinks',
          type: 'group',
          fields: [
            { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
            { name: 'twitter', type: 'text', label: 'Twitter / X URL' },
            { name: 'github', type: 'text', label: 'GitHub URL' },
            { name: 'instagram', type: 'text', label: 'Instagram URL' },
          ],
        },
      ],
    },
    {
      name: 'clientLogos',
      type: 'array',
      label: 'Client / Partner Logos (Social Proof Bar)',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Client Name' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
      admin: {
        description: 'Shown as a logo row on the home page for social proof',
      },
    },
    {
      name: 'problemPoints',
      type: 'array',
      label: 'Problem Points (Home Page)',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
      admin: {
        description: '3 pain points your clients face — shown in the Problem & Solution section',
      },
    },
    {
      name: 'pivotStatement',
      type: 'textarea',
      label: 'Pivot Statement',
      admin: {
        description: 'The bridge sentence that connects problems to your solution (Problem & Solution section)',
      },
    },
    {
      name: 'howItWorksSteps',
      type: 'array',
      label: 'How It Works Steps',
      maxRows: 4,
      fields: [
        { name: 'stepNumber', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
      defaultValue: [
        { stepNumber: 1, title: 'Consult', description: 'We start with a deep-dive session to understand your goals.' },
        { stepNumber: 2, title: 'Customize', description: 'We build a tailored strategy specific to your business.' },
        { stepNumber: 3, title: 'Complete', description: 'We deliver, iterate, and ensure you see measurable results.' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
