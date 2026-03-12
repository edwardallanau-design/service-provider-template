import Link from 'next/link'

import { Container } from '@/components/custom/Container'

interface NavItem {
  label: string
  href: string
}

interface SocialLinks {
  linkedin?: string | null
  twitter?: string | null
  github?: string | null
  instagram?: string | null
}

interface FooterProps {
  companyName: string
  tagline?: string | null
  navItems: NavItem[]
  email?: string | null
  phone?: string | null
  address?: string | null
  socialLinks?: SocialLinks | null
}

export function Footer({
  companyName,
  tagline,
  navItems,
  email,
  phone,
  address,
  socialLinks,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface)">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-sm font-bold text-(--color-foreground)">{companyName}</p>
            {tagline && <p className="mt-2 text-xs text-(--color-muted) leading-relaxed">{tagline}</p>}
            {/* Social icons */}
            {socialLinks && (
              <div className="mt-4 flex gap-3">
                {socialLinks.linkedin && (
                  <SocialLink href={socialLinks.linkedin} label="LinkedIn">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </SocialLink>
                )}
                {socialLinks.twitter && (
                  <SocialLink href={socialLinks.twitter} label="Twitter / X">
                    <path d="M4 4l16 16M4 20 20 4"/>
                  </SocialLink>
                )}
                {socialLinks.github && (
                  <SocialLink href={socialLinks.github} label="GitHub">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </SocialLink>
                )}
                {socialLinks.instagram && (
                  <SocialLink href={socialLinks.instagram} label="Instagram">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </SocialLink>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">Pages</p>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-(--color-muted) hover:text-(--color-foreground) transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          {(email ?? phone ?? address) && (
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">Contact</p>
              <ul className="space-y-2 text-sm text-(--color-muted)">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="hover:text-(--color-foreground) transition-colors">
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone}`} className="hover:text-(--color-foreground) transition-colors">
                      {phone}
                    </a>
                  </li>
                )}
                {address && <li className="leading-relaxed whitespace-pre-line">{address}</li>}
              </ul>
            </div>
          )}

          {/* Legal */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-(--color-muted)">Legal</p>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-(--color-muted) hover:text-(--color-foreground) transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-(--color-muted) hover:text-(--color-foreground) transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-(--color-border) py-6 flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-(--color-muted)">
            &copy; {year} {companyName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-full border border-(--color-border) text-(--color-muted) hover:text-(--color-foreground) hover:border-(--color-foreground) transition-colors"
    >
      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </a>
  )
}
