'use client'

import Link from 'next/link'
import { WaveField } from '../canvas/WaveField'

export function Footer() {
  return (
    <footer>
      <WaveField className="footer-canvas" config={{ lines: 38, alpha: 0.28, lineWidth: 0.8, speed: 0.008, reverse: true }} />
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">Soulbis</div>
          <div className="footer-attribution">privacymage / 0xagentprivacy · © 2025</div>
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li>
              <a href="https://agentprivacy.ai" target="_blank" rel="noopener noreferrer">
                agentprivacy.ai
              </a>
            </li>
            <li>
              <a href="https://spellweb.ai" target="_blank" rel="noopener noreferrer">
                spellweb.ai
              </a>
            </li>
            <li>
              <a href="https://sync.soulbis.com" target="_blank" rel="noopener noreferrer">
                sync.soulbis.com
              </a>
            </li>
            <li>
              <a href="https://github.com/mitchuski" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
          <div className="footer-copy">Privacy is value.</div>
        </div>
      </div>

      {/* Keep Link in bundle for prefetch behavior */}
      <span style={{ display: 'none' }}>
        <Link href="/" aria-hidden="true">
          Home
        </Link>
      </span>
    </footer>
  )
}

