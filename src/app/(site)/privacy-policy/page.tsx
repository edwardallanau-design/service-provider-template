import { unstable_cache } from 'next/cache'
import type { Metadata } from 'next'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Container } from '@/components/custom/Container'
import { Section } from '@/components/custom/Section'
import { RichText } from '@/components/custom/RichText'

const getLegalContent = unstable_cache(
  async () => {
    const payload = await getPayload()
    return payload.findGlobal({ slug: 'page-content' })
  },
  ['legal-content'],
  { tags: [CACHE_TAGS.content], revalidate: 3600 },
)

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default async function PrivacyPolicyPage() {
  const content = await getLegalContent()

  return (
    <>
      <Section className="bg-section-dark border-b border-(--color-border)" padding="sm">
        <Container>
          <div className="pt-16">
            <h1 className="text-display font-bold text-(--color-foreground)">Privacy Policy</h1>
          </div>
        </Container>
      </Section>
      <Section className="bg-section-dark">
        <Container size="narrow">
          {content.legal?.privacyPolicy ? (
            <RichText content={content.legal.privacyPolicy as Record<string, unknown>} />
          ) : (
            <p className="text-(--color-muted)">Privacy policy content coming soon.</p>
          )}
        </Container>
      </Section>
    </>
  )
}
