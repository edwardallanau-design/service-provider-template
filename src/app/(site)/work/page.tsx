import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { PageHeader } from '@/components/custom/PageHeader'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import type { Media } from '@/payload-types'

const getWorkData = unstable_cache(
  async () => {
    const payload = await getPayload()
    const [projects, pageContent] = await Promise.all([
      payload.find({
        collection: 'projects',
        where: { status: { equals: 'published' } },
        sort: '-order',
        limit: 50,
        depth: 1,
      }),
      payload.findGlobal({ slug: 'page-content' }),
    ])
    return { projects, pageContent }
  },
  ['work-page'],
  { tags: [CACHE_TAGS.projects, CACHE_TAGS.content], revalidate: 300 },
)

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies and client projects.',
}

export default async function WorkPage() {
  const { projects, pageContent } = await getWorkData()
  const header = pageContent.work

  const formattedProjects = projects.docs.map((p) => {
    const coverImage = p.coverImage as Media | null | undefined
    return {
      slug: p.slug ?? '',
      title: p.title,
      client: p.client ?? null,
      tagline: p.tagline ?? null,
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
        eyebrow={header?.eyebrow ?? 'Case Studies'}
        heading={header?.heading ?? 'Our Work'}
        subheading={header?.subheading ?? null}
      />
      <Section className="bg-section-dark">
        <Container>
          {formattedProjects.length === 0 ? (
            <p className="text-(--color-muted)">No projects published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {formattedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
