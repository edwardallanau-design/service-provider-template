import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { ButtonLink } from '@/components/custom/ButtonLink'

interface FinalHookProps {
  heading?: string | null
  ctaText?: string | null
  ctaHref?: string
}

export function FinalHook({
  heading = "Ready to get started? Let's talk.",
  ctaText = "Book a Free Consultation",
  ctaHref = '/contact',
}: FinalHookProps) {
  return (
    <Section className="bg-section-mid">
      <Container size="narrow">
        <div className="text-center">
          <h2 className="text-title font-bold text-(--color-foreground)">{heading}</h2>
          <p className="mt-4 text-sm text-(--color-muted)">
            No commitment. Just a conversation about your goals.
          </p>
          <div className="mt-8">
            <ButtonLink href={ctaHref} size="lg">
              {ctaText}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
