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
import type { Media } from '@/payload-types'

const getPost = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload()
      const result = await payload.find({
        collection: 'blog-posts',
        where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
        limit: 1,
        depth: 1,
      })
      return result.docs[0] ?? null
    },
    [`post-${slug}`],
    { tags: [CACHE_TAGS.blog], revalidate: 300 },
  )()

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const coverImage = post.coverImage as Media | null | undefined
  const coverUrl =
    coverImage && typeof coverImage === 'object' && coverImage.url ? coverImage.url : null

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      <Section className="bg-section-dark border-b border-(--color-border)" padding="sm">
        <Container size="narrow">
          <div className="pt-16">
            {formattedDate && (
              <p className="mb-3 text-xs text-(--color-muted)">{formattedDate}</p>
            )}
            <h1 className="text-display font-bold text-(--color-foreground)">{post.title}</h1>
            {post.excerpt && (
              <p className="mt-4 text-base text-(--color-muted) leading-relaxed">{post.excerpt}</p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map(({ tag }) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {coverUrl && (
        <div className="bg-section-dark py-8">
          <Container>
            <div className="aspect-video overflow-hidden rounded-(--radius-card)">
              <Image
                src={coverUrl}
                alt={
                  coverImage && typeof coverImage === 'object' && coverImage.alt
                    ? coverImage.alt
                    : post.title
                }
                width={1280}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </Container>
        </div>
      )}

      <Section className="bg-section-dark">
        <Container size="narrow">
          {post.content ? (
            <RichText content={post.content as Record<string, unknown>} />
          ) : (
            <p className="text-(--color-muted)">No content yet.</p>
          )}
        </Container>
      </Section>
    </>
  )
}
