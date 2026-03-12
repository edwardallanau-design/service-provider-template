import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'

interface Step {
  stepNumber: number
  title: string
  description?: string | null
}

interface HowItWorksProps {
  steps: Step[]
  eyebrow?: string
  heading?: string
}

export function HowItWorks({
  steps,
  eyebrow = 'Our Process',
  heading = 'Simple. Clear. Effective.',
}: HowItWorksProps) {
  if (!steps.length) return null

  return (
    <Section className="bg-section-light">
      <Container>
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
            {eyebrow}
          </p>
          <h2 className="text-display font-bold text-(--color-on-light)">{heading}</h2>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] h-px border-t border-dashed border-(--color-border) md:block" />
              )}
              {/* Step circle */}
              <div className="relative z-10 mb-5 flex size-12 items-center justify-center rounded-full border-2 border-(--color-on-light) bg-white text-sm font-bold text-(--color-on-light)">
                {step.stepNumber}
              </div>
              <h3 className="mb-2 text-base font-semibold text-(--color-on-light)">{step.title}</h3>
              {step.description && (
                <p className="text-sm text-(--color-muted) leading-relaxed">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
