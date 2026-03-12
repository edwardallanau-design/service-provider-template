import * as React from 'react'

import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'muted'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        variant === 'default' && 'bg-(--color-surface-raised) text-(--color-foreground)',
        variant === 'outline' && 'border border-(--color-border) text-(--color-muted)',
        variant === 'muted' && 'bg-(--color-surface) text-(--color-muted)',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
