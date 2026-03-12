import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: {
    slug: string
    title: string
    client?: string | null
    tagline?: string | null
    tags?: { tag: string }[] | null
    coverImage?: {
      url?: string | null
      alt?: string | null
    } | null
  }
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const coverUrl =
    project.coverImage &&
    typeof project.coverImage === 'object' &&
    'url' in project.coverImage
      ? project.coverImage.url
      : null

  const coverAlt =
    project.coverImage &&
    typeof project.coverImage === 'object' &&
    'alt' in project.coverImage
      ? (project.coverImage.alt ?? project.title)
      : project.title

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        'group block card-border bg-section-mid overflow-hidden hover:bg-(--color-surface-raised) transition-all duration-200',
        className,
      )}
    >
      {/* Cover image */}
      <div className="aspect-video w-full overflow-hidden bg-(--color-surface)">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={coverAlt}
            width={800}
            height={450}
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-(--color-border)">
            <svg className="size-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
        )}
      </div>

      <div className="p-5">
        {project.client && (
          <p className="mb-1 text-xs text-(--color-muted)">{project.client}</p>
        )}
        <h3 className="text-sm font-semibold text-(--color-foreground) leading-snug">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="mt-2 text-sm text-(--color-muted) leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(({ tag }) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
