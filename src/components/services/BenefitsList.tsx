import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'

interface Benefit {
  title: string
  description?: string | null
}

interface BenefitsListProps {
  benefits: Benefit[]
  eyebrow?: string
  heading?: string
}

export function BenefitsList({
  benefits,
  eyebrow = 'The Transformation',
  heading = 'What changes for you',
}: BenefitsListProps) {
  if (!benefits.length) return null

  return (
    <Section className="bg-section-mid">
      <Container>
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
            {eyebrow}
          </p>
          <h2 className="text-title font-bold text-(--color-foreground)">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-(--color-foreground) text-(--color-on-light)">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-(--color-foreground)">{benefit.title}</h3>
                {benefit.description && (
                  <p className="mt-1 text-sm text-(--color-muted) leading-relaxed">{benefit.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
