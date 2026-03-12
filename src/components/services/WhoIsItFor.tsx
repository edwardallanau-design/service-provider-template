import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'

interface WhoIsItForProps {
  text: string
}

export function WhoIsItFor({ text }: WhoIsItForProps) {
  return (
    <Section className="bg-section-light" padding="sm">
      <Container size="narrow">
        <div className="flex gap-4">
          <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-(--color-on-light)">
            <svg className="size-4 text-(--color-on-light)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
              Who Is This For?
            </p>
            <p className="text-base md:text-lg text-(--color-on-light) leading-relaxed">{text}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
