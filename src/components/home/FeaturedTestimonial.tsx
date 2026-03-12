import Image from 'next/image'

import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'

interface FeaturedTestimonialProps {
  quote: string
  clientName: string
  clientRole?: string | null
  clientCompany?: string | null
  measurableResult?: string | null
  photo?: {
    url?: string | null
    alt?: string | null
  } | null
}

export function FeaturedTestimonial({
  quote,
  clientName,
  clientRole,
  clientCompany,
  measurableResult,
  photo,
}: FeaturedTestimonialProps) {
  return (
    <Section className="bg-section-mid">
      <Container size="narrow">
        <div className="text-center">
          {/* Quote mark */}
          <svg
            className="mx-auto mb-8 size-10 text-(--color-border)"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>

          {measurableResult && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-section-dark px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-(--color-foreground)" />
              <span className="text-xs font-semibold text-(--color-foreground)">{measurableResult}</span>
            </div>
          )}

          <blockquote className="text-lg md:text-xl text-(--color-foreground) leading-relaxed font-light">
            &ldquo;{quote}&rdquo;
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-4">
            {photo?.url && (
              <Image
                src={photo.url}
                alt={photo.alt ?? clientName}
                width={48}
                height={48}
                className="size-12 rounded-full object-cover grayscale"
              />
            )}
            <div className="text-left">
              <p className="text-sm font-semibold text-(--color-foreground)">{clientName}</p>
              {(clientRole ?? clientCompany) && (
                <p className="text-xs text-(--color-muted)">
                  {[clientRole, clientCompany].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
