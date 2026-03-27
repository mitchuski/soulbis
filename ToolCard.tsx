// components/tools/ToolCard.tsx
// Tool card with status indicator.
// Status is architectural — see tools.data.ts and CLAUDE.md.

import Link from 'next/link'
import { ToolData } from '@/lib/types'

const STATUS_CONFIG = {
  available: {
    label: 'Available',
    color: 'var(--cyan)',
    dotClass: 'status-dot active',
  },
  building: {
    label: 'In development',
    color: 'var(--coral)',
    dotClass: 'status-dot building',
  },
  planned: {
    label: 'Planned',
    color: 'var(--white-ghost)',
    dotClass: 'status-dot planned',
  },
}

export function ToolCard({ status, subcategory, name, spec, desc, actionLabel, actionHref }: ToolData) {
  const { label, color, dotClass } = STATUS_CONFIG[status]
  const isPlanned = status === 'planned'

  return (
    <div className={`tool-card${isPlanned ? ' tool-placeholder' : ''}`}>
      <div className="tool-status" style={{ color }}>
        <span className={dotClass} />
        {label}
      </div>
      {subcategory && <div className="tool-subcategory">{subcategory}</div>}
      <div className="tool-name">{name}</div>
      <div
        className="tool-spec"
        dangerouslySetInnerHTML={{ __html: spec.replace(/</g, '&lt;').replace(/>/g, '&gt;') }}
      />
      <p className="tool-desc">{desc}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="tool-action"
          target={actionHref.startsWith('http') ? '_blank' : undefined}
          rel={actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {actionLabel} →
        </Link>
      )}
    </div>
  )
}
