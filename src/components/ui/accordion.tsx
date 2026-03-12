'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <div className="border-b border-(--color-border)">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-(--color-foreground) hover:text-(--color-accent-dim) transition-colors"
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg
          className={cn('size-4 shrink-0 text-(--color-muted) transition-transform duration-200', open && 'rotate-180')}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 text-sm text-(--color-muted) leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

interface AccordionProps {
  items: { question: string; answer: string }[]
  className?: string
}

function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('divide-y divide-(--color-border) border-t border-(--color-border)', className)}>
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}

export { Accordion, AccordionItem }
