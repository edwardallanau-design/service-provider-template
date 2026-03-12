import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { WhoIsItFor } from '@/components/services/WhoIsItFor'
import { ScopeGrid } from '@/components/services/ScopeGrid'
import { BenefitsList } from '@/components/services/BenefitsList'
import { ServiceFaq } from '@/components/services/ServiceFaq'
import { FinalHook } from '@/components/services/FinalHook'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'

const getService = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload()
      const result = await payload.find({
        collection: 'services',
        where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
        limit: 1,
      })
      return result.docs[0] ?? null
    },
    [`service-${slug}`],
    { tags: [CACHE_TAGS.services], revalidate: 300 },
  )()

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <Section className="bg-section-dark border-b border-(--color-border)" padding="sm">
        <Container>
          <div className="pt-16 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
              Service
            </p>
            <h1 className="text-display font-bold text-(--color-foreground)">{service.title}</h1>
            <p className="mt-4 text-base text-(--color-muted) leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </Container>
      </Section>

      {/* Who is this for */}
      {service.whoIsItFor && <WhoIsItFor text={service.whoIsItFor} />}

      {/* Scope */}
      {service.scope && service.scope.length > 0 && (
        <ScopeGrid
          items={service.scope.map((s) => ({
            title: s.title,
            description: s.description ?? null,
          }))}
        />
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <BenefitsList
          benefits={service.benefits.map((b) => ({
            title: b.title,
            description: b.description ?? null,
          }))}
        />
      )}

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <ServiceFaq
          items={service.faq.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))}
        />
      )}

      {/* Final Hook */}
      <FinalHook
        heading={service.finalHookHeading ?? null}
        ctaText={service.finalHookCtaText ?? null}
      />
    </>
  )
}
