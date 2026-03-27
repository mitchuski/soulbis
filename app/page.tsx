import { BUILT_ROWS } from '@/built.data'
import { ECOSYSTEM_NODES } from '@/ecosystem.data'
import { TOOLS } from '@/tools.data'
import { EcosystemNode } from '@/EcosystemNode'
import { ToolCard } from '@/ToolCard'

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px 80px' }}>
      <section style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 400 }}>
          Soulbis
        </h1>
        <p style={{ opacity: 0.85, maxWidth: 700 }}>
          The Swordsman builds. This scaffold is now runnable so you can edit content and component
          structure before deploying on GitHub Pages.
        </p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ marginBottom: 16 }}>Ecosystem</h2>
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {ECOSYSTEM_NODES.map((node) => (
            <EcosystemNode key={node.role} {...node} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ marginBottom: 16 }}>Tools</h2>
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {TOOLS.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: 16 }}>Built</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          {BUILT_ROWS.map((row) => (
            <article key={row.category}>
              <h3 style={{ fontFamily: 'var(--font-code)', marginBottom: 8 }}>{row.category}</h3>
              {row.items.map((item) => (
                <p key={item.name} style={{ marginBottom: 8, opacity: 0.9 }}>
                  <strong>{item.name}</strong>: {item.desc}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
