import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { PageHeader } from '@/components/custom/PageHeader'
import { ServiceCard } from '@/components/services/ServiceCard'

const getServicesPageData = unstable_cache(
  async () => {
    const payload = await getPayload()
    const [services, pageContent] = await Promise.all([
      payload.find({
        collection: 'services',
        where: { status: { equals: 'published' } },
        sort: 'order',
        limit: 50,
      }),
      payload.findGlobal({ slug: 'page-content' }),
    ])
    return { services, pageContent }
  },
  ['services-page'],
  { tags: [CACHE_TAGS.services, CACHE_TAGS.content], revalidate: 300 },
)

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our full range of services.',
}

export default async function ServicesPage() {
  const { services, pageContent } = await getServicesPageData()
  const header = pageContent.services

  return (
    <>
      <PageHeader
        eyebrow={header?.eyebrow ?? 'What We Do'}
        heading={header?.heading ?? 'Services'}
        subheading={header?.subheading ?? null}
      />
      <Section className="bg-section-dark">
        <Container>
          {services.docs.length === 0 ? (
            <p className="text-(--color-muted)">No services published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.docs.map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={{
                    slug: service.slug ?? '',
                    title: service.title,
                    shortDescription: service.shortDescription,
                    iconName: service.iconName ?? null,
                  }}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
