import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'
import SiteShell from '@/components/SiteShell'

export const metadata: Metadata = {
  metadataBase: new URL('https://nothingimpossible.com.my'),
  title: 'Nothing is Impossible — Full-Stack Digital Marketing | Zeta Digital',
  description:
    'Complete A-Z digital marketing and AI automation for ambitious Malaysian brands. SEO, Google Ads, Meta Ads, WhatsApp AI, Salesforce, and Agentic AI — one team, every channel.',
  keywords: [
    'digital marketing Malaysia', 'SEO Malaysia', 'Google Ads', 'Meta Ads',
    'WhatsApp marketing', 'AI automation', 'Salesforce Marketing Cloud', 'Zeta Digital',
  ],
  openGraph: {
    title: 'Nothing is Impossible — Zeta Digital',
    description: 'Full-stack digital marketing + AI automation, executed for you.',
    url: 'https://nothingimpossible.com.my',
    siteName: 'Zeta Digital',
    locale: 'en_MY',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Nothing is Impossible — Zeta Digital' },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zeta Digital',
  url: 'https://nothingimpossible.com.my',
  logo: 'https://nothingimpossible.com.my/icon-512.png',
  description: 'Full-stack digital marketing and AI automation agency in Malaysia.',
  address: { '@type': 'PostalAddress', addressCountry: 'MY' },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+60177922510',
    contactType: 'customer service',
  },
  sameAs: [] as string[],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  )
}
