import Image from 'next/image'

import { Container } from '@/components/custom/Container'

interface ClientLogo {
  name: string
  logo?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
}

interface SocialProofBarProps {
  logos: ClientLogo[]
  label?: string
}

export function SocialProofBar({ logos, label = 'Trusted by leading companies' }: SocialProofBarProps) {
  if (!logos.length) return null

  return (
    <div className="border-y border-(--color-border) bg-section-mid py-8">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-(--color-muted)">
          {label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((client) =>
            client.logo?.url ? (
              <Image
                key={client.name}
                src={client.logo.url}
                alt={client.logo.alt ?? client.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span
                key={client.name}
                className="text-sm font-semibold text-(--color-muted) opacity-50"
              >
                {client.name}
              </span>
            ),
          )}
        </div>
      </Container>
    </div>
  )
}
