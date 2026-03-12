import { cn } from '@/lib/utils'

type SectionElement = 'section' | 'div' | 'article' | 'aside'

interface SectionProps {
  children: React.ReactNode
  as?: SectionElement
  padding?: 'none' | 'sm' | 'default' | 'lg'
  className?: string
  id?: string
}

const paddingClasses = {
  none: '',
  sm: 'section-padding-sm',
  default: 'section-padding',
  lg: 'py-28 md:py-36',
}

export function Section({
  children,
  as: Tag = 'section',
  padding = 'default',
  className,
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(paddingClasses[padding], className)}>
      {children}
    </Tag>
  )
}
