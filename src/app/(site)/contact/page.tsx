import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { PageHeader } from '@/components/custom/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'

const getContactData = unstable_cache(
  async () => {
    const payload = await getPayload()
    const [settings, pageContent, services] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'page-content' }),
      payload.find({
        collection: 'services',
        where: { status: { equals: 'published' } },
        sort: 'order',
        limit: 50,
        select: { title: true },
      }),
    ])
    return { settings, pageContent, services }
  },
  ['contact-page'],
  { tags: [CACHE_TAGS.settings, CACHE_TAGS.content, CACHE_TAGS.services], revalidate: 300 },
)

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with us.',
}

export default async function ContactPage() {
  const { settings, pageContent, services } = await getContactData()
  const header = pageContent.contact
  const contact = settings.contact

  const serviceOptions = services.docs.map((s) => s.title)

  return (
    <>
      <PageHeader
        eyebrow={header?.eyebrow ?? 'Contact'}
        heading={header?.heading ?? 'Get in Touch'}
        subheading={header?.subheading ?? null}
      />
      <Section className="bg-section-dark">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="mb-6 text-title font-semibold text-(--color-foreground)">
                Let&apos;s start a conversation
              </h2>
              <div className="space-y-5">
                {contact?.email && (
                  <ContactInfoRow icon="email" label="Email">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-(--color-foreground) hover:underline"
                    >
                      {contact.email}
                    </a>
                  </ContactInfoRow>
                )}
                {contact?.phone && (
                  <ContactInfoRow icon="phone" label="Phone">
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm text-(--color-foreground) hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </ContactInfoRow>
                )}
                {contact?.address && (
                  <ContactInfoRow icon="location" label="Address">
                    <p className="text-sm text-(--color-foreground) whitespace-pre-line">
                      {contact.address}
                    </p>
                  </ContactInfoRow>
                )}
              </div>
            </div>

            {/* Form */}
            <div>
              <ContactForm serviceOptions={serviceOptions} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

function ContactInfoRow({
  icon,
  label,
  children,
}: {
  icon: 'email' | 'phone' | 'location'
  label: string
  children: React.ReactNode
}) {
  const icons = {
    email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17',
    location: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  }

  return (
    <div className="flex gap-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-(--color-border)">
        <svg className="size-4 text-(--color-muted)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {icons[icon].split(' M').map((d, i) => (
            <path key={i} d={i === 0 ? d : `M${d}`} />
          ))}
        </svg>
      </div>
      <div>
        <p className="mb-0.5 text-xs text-(--color-muted)">{label}</p>
        {children}
      </div>
    </div>
  )
}
