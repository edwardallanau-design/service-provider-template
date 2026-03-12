import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import Image from 'next/image'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { Badge } from '@/components/ui/badge'
import { RichText } from '@/components/custom/RichText'
import { ButtonLink } from '@/components/custom/ButtonLink'
import type { Media } from '@/payload-types'

const getProject = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload()
      const result = await payload.find({
        collection: 'projects',
        where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
        limit: 1,
        depth: 1,
      })
      return result.docs[0] ?? null
    },
    [`project-${slug}`],
    { tags: [CACHE_TAGS.projects], revalidate: 300 },
  )()

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.tagline ?? undefined,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const coverImage = project.coverImage as Media | null | undefined
  const coverUrl =
    coverImage && typeof coverImage === 'object' && coverImage.url ? coverImage.url : null
  const coverAlt =
    coverImage && typeof coverImage === 'object' && coverImage.alt ? coverImage.alt : project.title

  return (
    <>
      {/* Hero */}
      <Section className="bg-section-dark border-b border-(--color-border)" padding="sm">
        <Container>
          <div className="pt-16 max-w-3xl">
            {project.client && (
              <p className="mb-2 text-xs text-(--color-muted)">{project.client}</p>
            )}
            <h1 className="text-display font-bold text-(--color-foreground)">{project.title}</h1>
            {project.tagline && (
              <p className="mt-4 text-base text-(--color-muted) leading-relaxed">{project.tagline}</p>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(({ tag }) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Cover image */}
      {coverUrl && (
        <div className="bg-section-dark">
          <Container>
            <div className="aspect-video overflow-hidden rounded-(--radius-card)">
              <Image
                src={coverUrl}
                alt={coverAlt}
                width={1280}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </Container>
        </div>
      )}

      {/* Content */}
      <Section className="bg-section-dark">
        <Container size="narrow">
          {/* Key results */}
          {project.results && project.results.length > 0 && (
            <div className="mb-10 card-border bg-section-mid p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
                Key Results
              </p>
              <ul className="space-y-2">
                {project.results.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <svg className="mt-0.5 size-4 shrink-0 text-(--color-foreground)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-(--color-foreground) font-medium">{r.metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {project.description && (
            <RichText
              content={project.description as Record<string, unknown>}
              className="prose-invert"
            />
          )}

          {/* Live URL */}
          {project.liveUrl && (
            <div className="mt-8">
              <ButtonLink href={project.liveUrl} variant="outline" size="sm">
                View Live Project →
              </ButtonLink>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
