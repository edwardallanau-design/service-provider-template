import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { PageHeader } from '@/components/custom/PageHeader'
import { BlogCard } from '@/components/blog/BlogCard'
import type { Media } from '@/payload-types'

const getBlogData = unstable_cache(
  async () => {
    const payload = await getPayload()
    const [posts, pageContent] = await Promise.all([
      payload.find({
        collection: 'blog-posts',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 50,
        depth: 1,
      }),
      payload.findGlobal({ slug: 'page-content' }),
    ])
    return { posts, pageContent }
  },
  ['blog-page'],
  { tags: [CACHE_TAGS.blog, CACHE_TAGS.content], revalidate: 300 },
)

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tips, and resources.',
}

export default async function BlogPage() {
  const { posts, pageContent } = await getBlogData()
  const header = pageContent.blog

  const formattedPosts = posts.docs.map((p) => {
    const coverImage = p.coverImage as Media | null | undefined
    return {
      slug: p.slug ?? '',
      title: p.title,
      excerpt: p.excerpt ?? null,
      publishedAt: p.publishedAt ?? null,
      tags: p.tags ?? null,
      coverImage:
        coverImage && typeof coverImage === 'object' && coverImage.url
          ? { url: coverImage.url, alt: coverImage.alt }
          : null,
    }
  })

  return (
    <>
      <PageHeader
        eyebrow={header?.eyebrow ?? 'Resources'}
        heading={header?.heading ?? 'Blog'}
        subheading={header?.subheading ?? null}
      />
      <Section className="bg-section-dark">
        <Container>
          {formattedPosts.length === 0 ? (
            <p className="text-(--color-muted)">No posts published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {formattedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
