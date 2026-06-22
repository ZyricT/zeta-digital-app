import type { Metadata } from 'next'
import Script from 'next/script'
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

const SERVICES = [
  'SEO & Content Marketing', 'Google Search Ads', 'Meta Ads (Facebook & Instagram)',
  'WhatsApp Marketing & AI Chatbots', 'Email Retargeting', 'Agentic AI Automation',
  'Salesforce Marketing Cloud',
]

// Rich entity graph — strengthens how search + AI engines (ChatGPT, Gemini,
// Perplexity, Google AI) understand and cite Zeta Digital (AEO/GEO).
const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': 'https://nothingimpossible.com.my/#org',
      name: 'Zeta Digital',
      alternateName: 'Zeta Digital Malaysia',
      url: 'https://nothingimpossible.com.my',
      logo: 'https://nothingimpossible.com.my/icon-512.png',
      image: 'https://nothingimpossible.com.my/icon-512.png',
      description:
        'Full-stack digital marketing and AI automation agency in Malaysia — SEO, Google Ads, Meta Ads, WhatsApp marketing, email retargeting and Agentic AI, all executed in-house.',
      slogan: 'Nothing is Impossible',
      areaServed: { '@type': 'Country', name: 'Malaysia' },
      address: { '@type': 'PostalAddress', addressCountry: 'MY' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+60177922510',
        contactType: 'sales',
        areaServed: 'MY',
        availableLanguage: ['English', 'Chinese', 'Malay'],
      },
      knowsAbout: SERVICES,
      sameAs: [] as string[],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Marketing Services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s, areaServed: 'Malaysia' },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://nothingimpossible.com.my/#website',
      url: 'https://nothingimpossible.com.my',
      name: 'Zeta Digital',
      publisher: { '@id': 'https://nothingimpossible.com.my/#org' },
      inLanguage: ['en-MY', 'zh', 'ms'],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID
  return (
    <html lang="en">
      <body>
        {gtm && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
        )}
        {gtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  )
}
