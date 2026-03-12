import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'

interface ScopeItem {
  title: string
  description?: string | null
}

interface ScopeGridProps {
  items: ScopeItem[]
  eyebrow?: string
  heading?: string
}

export function ScopeGrid({
  items,
  eyebrow = "What's Included",
  heading = 'The full scope of work',
}: ScopeGridProps) {
  if (!items.length) return null

  return (
    <Section className="bg-section-dark">
      <Container>
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
            {eyebrow}
          </p>
          <h2 className="text-title font-bold text-(--color-foreground)">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 card-border bg-section-mid p-5">
              <svg
                className="mt-0.5 size-4 shrink-0 text-(--color-foreground)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-(--color-foreground)">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-sm text-(--color-muted) leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
