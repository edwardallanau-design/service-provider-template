import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  size?: 'narrow' | 'default' | 'wide'
  className?: string
}

const sizeClasses = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-screen-2xl',
}

export function Container({ children, size = 'default', className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
