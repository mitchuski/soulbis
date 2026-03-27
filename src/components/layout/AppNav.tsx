import Link from 'next/link'

export function AppNav() {
  return (
    <nav>
      <Link href="/" className="nav-logo" aria-label="Soulbis home">
        <svg className="glyph" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="10" cy="14" r="9" fill="#4dd9e8" opacity="0.9" />
          <circle cx="18" cy="14" r="9" fill="#e8523a" opacity="0.85" />
          <circle cx="14" cy="14" r="5" fill="#080c20" opacity="0.6" />
        </svg>
        Soulbis
      </Link>
      <ul className="nav-links">
        <li>
          <a href="#ecosystem">Ecosystem</a>
        </li>
        <li>
          <a href="#tools">Tools</a>
        </li>
        <li>
          <a href="https://sync.soulbis.com" target="_blank" rel="noopener noreferrer">
            Soul Sync
          </a>
        </li>
        <li>
          <a href="mailto:mage@agentprivacy.ai" className="nav-cta">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}

