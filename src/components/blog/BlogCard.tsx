import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: {
    slug: string
    title: string
    excerpt?: string | null
    publishedAt?: string | null
    tags?: { tag: string }[] | null
    coverImage?: {
      url?: string | null
      alt?: string | null
    } | null
  }
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const coverUrl =
    post.coverImage && typeof post.coverImage === 'object' && 'url' in post.coverImage
      ? post.coverImage.url
      : null

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group block card-border bg-section-mid overflow-hidden hover:bg-(--color-surface-raised) transition-all duration-200',
        className,
      )}
    >
      {coverUrl && (
        <div className="aspect-video w-full overflow-hidden bg-(--color-surface)">
          <Image
            src={coverUrl}
            alt={
              post.coverImage && typeof post.coverImage === 'object' && 'alt' in post.coverImage
                ? (post.coverImage.alt ?? post.title)
                : post.title
            }
            width={800}
            height={450}
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      )}
      <div className="p-5">
        {formattedDate && (
          <p className="mb-2 text-xs text-(--color-muted)">{formattedDate}</p>
        )}
        <h3 className="text-sm font-semibold text-(--color-foreground) leading-snug group-hover:text-white transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-(--color-muted) line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(({ tag }) => (
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
