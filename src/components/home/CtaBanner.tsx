import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { ButtonLink } from '@/components/custom/ButtonLink'

interface CtaBannerProps {
  heading?: string
  subtext?: string | null
  primaryCtaText?: string
  primaryCtaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export function CtaBanner({
  heading = 'Ready to grow your business?',
  subtext,
  primaryCtaText = "Let's Talk",
  primaryCtaHref = '/contact',
  secondaryCtaText,
  secondaryCtaHref,
}: CtaBannerProps) {
  return (
    <Section className="bg-section-light">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display font-bold text-(--color-on-light)">{heading}</h2>
          {subtext && (
            <p className="mt-4 text-base text-(--color-muted) leading-relaxed">{subtext}</p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href={primaryCtaHref}
              variant="default"
              size="lg"
              className="bg-(--color-on-light) text-(--color-section-light) hover:opacity-90"
            >
              {primaryCtaText}
            </ButtonLink>
            {secondaryCtaText && secondaryCtaHref && (
              <ButtonLink href={secondaryCtaHref} variant="outline" size="lg">
                {secondaryCtaText}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
