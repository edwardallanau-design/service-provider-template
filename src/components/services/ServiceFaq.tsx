import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { Accordion } from '@/components/ui/accordion'

interface FaqItem {
  question: string
  answer: string
}

interface ServiceFaqProps {
  items: FaqItem[]
  eyebrow?: string
  heading?: string
}

export function ServiceFaq({
  items,
  eyebrow = 'FAQ',
  heading = 'Common questions',
}: ServiceFaqProps) {
  if (!items.length) return null

  return (
    <Section className="bg-section-dark">
      <Container size="narrow">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
            {eyebrow}
          </p>
          <h2 className="text-title font-bold text-(--color-foreground)">{heading}</h2>
        </div>
        <Accordion items={items} />
      </Container>
    </Section>
  )
}
