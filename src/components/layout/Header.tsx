'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  companyName: string
  navItems: NavItem[]
  ctaHref?: string
  ctaText?: string
}

export function Header({
  companyName,
  navItems,
  ctaHref = '/contact',
  ctaText = 'Get in Touch',
}: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-(--color-border) bg-(--color-background)/90 backdrop-blur-sm'
          : 'bg-transparent',
      )}
    >
      <div className="container-site">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-bold tracking-tight text-(--color-foreground) hover:opacity-80 transition-opacity"
          >
            {companyName}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'text-(--color-foreground) font-medium'
                    : 'text-(--color-muted) hover:text-(--color-foreground)',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href={ctaHref}
              className="hidden md:inline-flex h-9 items-center px-4 text-sm font-medium rounded-(--radius-button) bg-(--color-foreground) text-(--color-on-light) hover:opacity-90 transition-opacity"
            >
              {ctaText}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-(--color-muted) hover:text-(--color-foreground) transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              ) : (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-(--color-border) bg-(--color-background)/95 backdrop-blur-sm">
          <div className="container-site py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'py-2.5 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-(--color-foreground)'
                    : 'text-(--color-muted) hover:text-(--color-foreground)',
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              className="mt-3 inline-flex h-10 items-center justify-center px-5 text-sm font-medium rounded-(--radius-button) bg-(--color-foreground) text-(--color-on-light)"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
