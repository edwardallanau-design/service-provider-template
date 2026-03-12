import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { ButtonLink } from '@/components/custom/ButtonLink'
import { ServiceCard } from '@/components/services/ServiceCard'

interface Service {
  slug: string
  title: string
  shortDescription: string
  iconName?: string | null
}

interface ServicesPreviewProps {
  services: Service[]
  eyebrow?: string
  heading?: string
  subheading?: string | null
}

export function ServicesPreview({
  services,
  eyebrow = 'What We Do',
  heading = 'Services built to grow your business',
  subheading,
}: ServicesPreviewProps) {
  if (!services.length) return null

  return (
    <Section className="bg-section-dark">
      <Container>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
              {eyebrow}
            </p>
            <h2 className="text-display font-bold text-(--color-foreground)">{heading}</h2>
            {subheading && (
              <p className="mt-3 max-w-xl text-base text-(--color-muted)">{subheading}</p>
            )}
          </div>
          <ButtonLink href="/services" variant="outline" size="sm" className="shrink-0">
            All Services →
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
