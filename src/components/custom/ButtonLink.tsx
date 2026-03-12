import Link from 'next/link'

import { Button, type ButtonProps } from '@/components/ui/button'

interface ButtonLinkProps extends ButtonProps {
  href: string
}

export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}
