import { cn } from '@/lib/utils'

interface RichTextProps {
  content: Record<string, unknown> | null | undefined
  className?: string
}

// Minimal Payload Lexical renderer — handles the most common node types.
// For a full-featured renderer, swap in @payloadcms/richtext-lexical/react.
function renderNode(node: Record<string, unknown>, index: number): React.ReactNode {
  const type = node['type'] as string
  const children = node['children'] as Record<string, unknown>[] | undefined

  if (type === 'text') {
    const text = node['text'] as string
    let el: React.ReactNode = text
    if (node['bold']) el = <strong key={index}>{el}</strong>
    if (node['italic']) el = <em key={index}>{el}</em>
    if (node['underline']) el = <u key={index}>{el}</u>
    if (node['code']) el = <code key={index} className="font-mono text-sm bg-(--color-surface-raised) px-1 rounded">{el}</code>
    return <span key={index}>{el}</span>
  }

  if (type === 'paragraph') {
    return (
      <p key={index} className="mb-4 last:mb-0 leading-relaxed">
        {children?.map((child, i) => renderNode(child, i))}
      </p>
    )
  }

  if (type === 'heading') {
    const tag = (node['tag'] as string) ?? 'h2'
    const headingClasses: Record<string, string> = {
      h1: 'text-3xl font-bold mb-4 mt-8 first:mt-0',
      h2: 'text-2xl font-bold mb-3 mt-6 first:mt-0',
      h3: 'text-xl font-semibold mb-3 mt-5 first:mt-0',
      h4: 'text-lg font-semibold mb-2 mt-4 first:mt-0',
    }
    const Tag = tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    return (
      <Tag key={index} className={headingClasses[tag] ?? 'font-bold mb-3'}>
        {children?.map((child, i) => renderNode(child, i))}
      </Tag>
    )
  }

  if (type === 'list') {
    const listType = node['listType'] as string
    const items = children?.map((child, i) => (
      <li key={i} className="mb-1">
        {(child['children'] as Record<string, unknown>[])?.map((c, j) => renderNode(c, j))}
      </li>
    ))
    return listType === 'number' ? (
      <ol key={index} className="list-decimal list-inside mb-4 space-y-1">{items}</ol>
    ) : (
      <ul key={index} className="list-disc list-inside mb-4 space-y-1">{items}</ul>
    )
  }

  if (type === 'link') {
    const url = (node['fields'] as Record<string, unknown> | undefined)?.['url'] as string | undefined
    return (
      <a
        key={index}
        href={url ?? '#'}
        className="underline underline-offset-2 hover:opacity-80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children?.map((child, i) => renderNode(child, i))}
      </a>
    )
  }

  if (type === 'horizontalrule') {
    return <hr key={index} className="my-6 border-t border-(--color-border)" />
  }

  if (children) {
    return <React.Fragment key={index}>{children.map((child, i) => renderNode(child, i))}</React.Fragment>
  }

  return null
}

import React from 'react'

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null

  const root = content['root'] as Record<string, unknown> | undefined
  const nodes = (root?.['children'] as Record<string, unknown>[]) ?? []

  return (
    <div className={cn('text-(--color-muted) leading-relaxed', className)}>
      {nodes.map((node, i) => renderNode(node, i))}
    </div>
  )
}
