import { Container } from './Container'

interface PageHeaderProps {
  eyebrow?: string | null
  heading: string
  subheading?: string | null
}

export function PageHeader({ eyebrow, heading, subheading }: PageHeaderProps) {
  return (
    <div className="bg-section-dark section-padding-sm border-b border-(--color-border)">
      <Container>
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
              {eyebrow}
            </p>
          )}
          <h1 className="text-display font-bold text-(--color-foreground)">{heading}</h1>
          {subheading && (
            <p className="mt-4 text-base text-(--color-muted) leading-relaxed">{subheading}</p>
          )}
        </div>
      </Container>
    </div>
  )
}
