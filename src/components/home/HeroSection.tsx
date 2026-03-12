import Link from 'next/link'

import { Container } from '@/components/custom/Container'

interface HeroSectionProps {
  badgeText?: string | null
  heading: string
  headingHighlight?: string | null
  subheading?: string | null
  primaryCta?: { text?: string | null; href?: string | null } | null
  secondaryCta?: { text?: string | null; href?: string | null } | null
}

export function HeroSection({
  badgeText,
  heading,
  headingHighlight,
  subheading,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  // Split heading at highlight to render different style on highlight
  const headingParts = headingHighlight
    ? heading.split(headingHighlight)
    : [heading]

  return (
    <section className="relative min-h-[92vh] flex items-center bg-section-dark overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent to-(--color-background) opacity-70" />

      <Container className="relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          {badgeText && (
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-1.5 text-xs font-medium text-(--color-muted)">
              <span className="size-1.5 rounded-full bg-(--color-foreground)" />
              {badgeText}
            </div>
          )}

          <h1 className="text-hero font-bold text-(--color-foreground) animate-fade-up animate-delay-100">
            {headingHighlight && headingParts.length > 1 ? (
              <>
                {headingParts[0]}
                <span className="italic font-light">{headingHighlight}</span>
                {headingParts[1]}
              </>
            ) : (
              heading
            )}
          </h1>

          {subheading && (
            <p className="mt-6 text-base md:text-lg text-(--color-muted) leading-relaxed max-w-xl animate-fade-up animate-delay-200">
              {subheading}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up animate-delay-300">
            {primaryCta?.text && primaryCta.href && (
              <Link
                href={primaryCta.href}
                className="inline-flex h-12 items-center px-6 text-sm font-medium rounded-(--radius-button) bg-(--color-foreground) text-(--color-on-light) hover:opacity-90 transition-opacity"
              >
                {primaryCta.text}
              </Link>
            )}
            {secondaryCta?.text && secondaryCta.href && (
              <Link
                href={secondaryCta.href}
                className="inline-flex h-12 items-center gap-2 px-6 text-sm font-medium text-(--color-muted) hover:text-(--color-foreground) transition-colors"
              >
                {secondaryCta.text}
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
