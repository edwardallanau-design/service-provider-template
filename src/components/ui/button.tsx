import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-(--color-foreground) text-(--color-on-light) hover:bg-(--color-accent-dim) rounded-(--radius-button)',
        outline:
          'border border-(--color-border) text-(--color-foreground) hover:bg-(--color-surface-raised) rounded-(--radius-button)',
        ghost:
          'text-(--color-foreground) hover:bg-(--color-surface-raised) rounded-(--radius-button)',
        secondary:
          'bg-(--color-surface) border border-(--color-border) text-(--color-foreground) hover:bg-(--color-surface-raised) rounded-(--radius-button)',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 rounded-(--radius-button)',
        link: 'text-(--color-foreground) underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
