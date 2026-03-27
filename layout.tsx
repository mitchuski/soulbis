// app/layout.tsx

import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Soulbis — The Swordsman Builds',
  description:
    'The Swordsman builds. The blade slices surveillance. Soulbis ships the tools that enforce the boundaries agentprivacy.ai defines.',
  metadataBase: new URL('https://soulbis.com'),
  openGraph: {
    title: 'Soulbis — The Swordsman Builds',
    description: 'Privacy as architecture, not policy.',
    url: 'https://soulbis.com',
    siteName: 'Soulbis',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@privacymage',
    creator: '@privacymage',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
