import Link from 'next/link'
import * as Icons from 'lucide-react'

import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: {
    slug: string
    title: string
    shortDescription: string
    iconName?: string | null
  }
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const IconComponent =
    service.iconName && service.iconName in Icons
      ? (Icons[service.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>)
      : null

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group block card-border bg-section-mid p-6 hover:bg-(--color-surface-raised) transition-all duration-200',
        className,
      )}
    >
      {IconComponent && (
        <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-(--color-border) text-(--color-muted) group-hover:text-(--color-foreground) transition-colors">
          <IconComponent className="size-5" />
        </div>
      )}
      <h3 className="mb-2 text-sm font-semibold text-(--color-foreground) group-hover:text-white transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-(--color-muted) leading-relaxed line-clamp-3">
        {service.shortDescription}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs text-(--color-muted) group-hover:text-(--color-foreground) transition-colors">
        Learn more
        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </span>
    </Link>
  )
}
