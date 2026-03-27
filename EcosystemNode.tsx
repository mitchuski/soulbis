// components/ecosystem/EcosystemNode.tsx
// Single node card in the ecosystem grid.
// ColorVariant is architectural — see CLAUDE.md before changing color assignments.

import Link from 'next/link'
import { EcosystemNodeData } from '@/lib/types'

export function EcosystemNode({
  glyph,
  role,
  name,
  desc,
  href,
  colorVariant,
  isActive = false,
  isExternal = false,
}: EcosystemNodeData) {
  const roleClass = colorVariant === 'red'
    ? 'node-role node-role--red'
    : colorVariant === 'cyan'
    ? 'node-role node-role--cyan'
    : 'node-role'

  const nameClass = colorVariant === 'red'
    ? 'node-name node-name--red'
    : colorVariant === 'cyan'
    ? 'node-name node-name--cyan'
    : 'node-name'

  const linkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Link
      href={href}
      className={`ecosystem-node${isActive ? ' active' : ''}`}
      {...linkProps}
    >
      <div className="node-glyph">{glyph}</div>
      <div>
        <div className={roleClass}>{role}</div>
        <div className={nameClass}>{name}</div>
      </div>
      <p className="node-desc">{desc}</p>
      <div className="node-link">{href.replace('https://', '')} →</div>
    </Link>
  )
}
