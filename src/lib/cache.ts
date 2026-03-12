export const CACHE_TAGS = {
  services: 'services',
  projects: 'projects',
  blog: 'blog',
  team: 'team',
  testimonials: 'testimonials',
  settings: 'site-settings',
  hero: 'hero',
  media: 'media',
  content: 'page-content',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]
