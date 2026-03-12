import { unstable_cache } from 'next/cache'

import { getPayload } from '@/lib/payload'
import { CACHE_TAGS } from '@/lib/cache'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload()
    return payload.findGlobal({ slug: 'site-settings' })
  },
  ['site-settings-layout'],
  { tags: [CACHE_TAGS.settings], revalidate: 300 },
)

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  const companyName = settings.branding?.companyName ?? 'Your Company'
  const navItems = (settings.navigation ?? []).map((n) => ({
    label: n.label,
    href: n.href,
  }))

  const socialLinks = settings.contact?.socialLinks ?? null

  return (
    <>
      <Header companyName={companyName} navItems={navItems} />
      <main>{children}</main>
      <Footer
        companyName={companyName}
        tagline={settings.branding?.tagline ?? null}
        navItems={navItems}
        email={settings.contact?.email ?? null}
        phone={settings.contact?.phone ?? null}
        address={settings.contact?.address ?? null}
        socialLinks={socialLinks}
      />
    </>
  )
}
