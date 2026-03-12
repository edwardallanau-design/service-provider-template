import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'
import * as Icons from 'lucide-react'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { PageHeader } from '@/components/custom/PageHeader'
import { RichText } from '@/components/custom/RichText'
import { TeamMemberCard } from '@/components/team/TeamMemberCard'
import { ButtonLink } from '@/components/custom/ButtonLink'
import type { Media } from '@/payload-types'

const getAboutData = unstable_cache(
  async () => {
    const payload = await getPayload()
    const [team, pageContent] = await Promise.all([
      payload.find({
        collection: 'team-members',
        sort: 'order',
        limit: 20,
        depth: 1,
      }),
      payload.findGlobal({ slug: 'page-content' }),
    ])
    return { team, pageContent }
  },
  ['about-page'],
  { tags: [CACHE_TAGS.team, CACHE_TAGS.content], revalidate: 300 },
)

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about our team and mission.',
}

export default async function AboutPage() {
  const { team, pageContent } = await getAboutData()
  const about = pageContent.about

  return (
    <>
      <PageHeader
        eyebrow={about?.eyebrow ?? 'About Us'}
        heading={about?.heading ?? 'About'}
        subheading={about?.subheading ?? null}
      />

      {/* Mission */}
      {about?.mission && (
        <Section className="bg-section-light" padding="sm">
          <Container size="narrow">
            <p className="text-lg md:text-xl text-(--color-on-light) leading-relaxed font-light italic border-l-2 border-(--color-on-light) pl-6">
              {about.mission}
            </p>
          </Container>
        </Section>
      )}

      {/* Story */}
      {about?.story && (
        <Section className="bg-section-dark">
          <Container size="narrow">
            <RichText content={about.story as Record<string, unknown>} />
          </Container>
        </Section>
      )}

      {/* Values */}
      {about?.values && about.values.length > 0 && (
        <Section className="bg-section-mid">
          <Container>
            <div className="mb-10 text-center">
              <h2 className="text-display font-bold text-(--color-foreground)">What drives us</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {about.values.map((value, i) => {
                const IconComponent =
                  value.icon && value.icon in Icons
                    ? (Icons[value.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>)
                    : null
                return (
                  <div key={i} className="card-border bg-section-dark p-6">
                    {IconComponent && (
                      <IconComponent className="mb-4 size-6 text-(--color-foreground)" />
                    )}
                    <h3 className="mb-2 text-sm font-semibold text-(--color-foreground)">{value.title}</h3>
                    {value.description && (
                      <p className="text-sm text-(--color-muted) leading-relaxed">{value.description}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Team */}
      {team.docs.length > 0 && (
        <Section className="bg-section-dark">
          <Container>
            <div className="mb-10">
              <h2 className="text-display font-bold text-(--color-foreground)">
                {about?.teamHeading ?? 'Meet the Team'}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {team.docs.map((member) => {
                const photo = member.photo as Media | null | undefined
                return (
                  <TeamMemberCard
                    key={member.id}
                    member={{
                      name: member.name,
                      role: member.role,
                      bio: member.bio ?? null,
                      photo:
                        photo && typeof photo === 'object' && photo.url
                          ? { url: photo.url, alt: photo.alt }
                          : null,
                      socialLinks: member.socialLinks ?? null,
                    }}
                  />
                )
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      {about?.ctaHeading && (
        <Section className="bg-section-light">
          <Container size="narrow">
            <div className="text-center">
              <h2 className="text-display font-bold text-(--color-on-light)">{about.ctaHeading}</h2>
              {about.ctaSubtext && (
                <p className="mt-4 text-base text-(--color-muted)">{about.ctaSubtext}</p>
              )}
              <div className="mt-8">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="bg-(--color-on-light) text-(--color-section-light)"
                >
                  Get in Touch
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
