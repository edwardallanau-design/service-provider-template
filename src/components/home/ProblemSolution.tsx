import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'

interface ProblemPoint {
  title: string
  description?: string | null
}

interface ProblemSolutionProps {
  problemPoints: ProblemPoint[]
  pivotStatement?: string | null
  sectionLabel?: string
}

export function ProblemSolution({
  problemPoints,
  pivotStatement,
  sectionLabel = 'The Problem',
}: ProblemSolutionProps) {
  if (!problemPoints.length) return null

  return (
    <Section className="bg-section-dark">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
            {sectionLabel}
          </p>
          <h2 className="text-display font-bold text-(--color-foreground)">
            Sound familiar?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {problemPoints.map((point, i) => (
            <div
              key={i}
              className="card-border bg-section-mid p-6 hover:bg-(--color-surface-raised) transition-colors"
            >
              <div className="mb-3 flex size-8 items-center justify-center rounded-full border border-(--color-border) text-sm font-bold text-(--color-muted)">
                {i + 1}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-(--color-foreground)">{point.title}</h3>
              {point.description && (
                <p className="text-sm text-(--color-muted) leading-relaxed">{point.description}</p>
              )}
            </div>
          ))}
        </div>

        {pivotStatement && (
          <div className="mt-12 border-t border-(--color-border) pt-12">
            <p className="max-w-2xl text-lg md:text-xl text-(--color-foreground) leading-relaxed font-light">
              {pivotStatement}
            </p>
          </div>
        )}
      </Container>
    </Section>
  )
}
