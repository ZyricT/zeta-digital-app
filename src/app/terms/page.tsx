import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Zeta Digital',
  description: 'The terms governing your use of the Zeta Digital website and services.',
  alternates: { canonical: 'https://nothingimpossible.com.my/terms' },
  robots: { index: true, follow: true },
}

const UPDATED = '27 June 2026'

const h2: React.CSSProperties = { color: '#fff', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(20px,3vw,26px)', margin: '40px 0 14px' }
const p: React.CSSProperties = { color: 'rgba(255,255,255,.7)', fontSize: 16, lineHeight: 1.8, margin: '0 0 14px' }

export default function TermsPage() {
  return (
    <section className="sec page-hero">
      <div className="glow g-lime gtr" />
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div style={{ fontFamily: "'Space Mono'", fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>
          <Link href="/">Home</Link> → Terms of Service
        </div>
        <h1 style={{ fontSize: 'clamp(34px,6vw,56px)', margin: '6px 0 8px' }}>Terms of Service</h1>
        <p style={{ color: 'rgba(255,255,255,.4)', fontFamily: "'Space Mono'", fontSize: 13, marginBottom: 8 }}>Last updated: {UPDATED}</p>

        <p style={p}>These Terms of Service (“Terms”) govern your access to and use of the website nothingimpossible.com.my and any services provided by Zeta Digital (“we”, “us”, “our”). By using this website or engaging our services, you agree to these Terms.</p>

        <h2 style={h2}>1. Our services</h2>
        <p style={p}>Zeta Digital provides digital marketing and AI automation services, including SEO, Google Ads, Meta Ads, WhatsApp marketing, email marketing and related services. The specific scope, deliverables and fees for any engagement are agreed separately in writing.</p>

        <h2 style={h2}>2. Enquiries and free audit</h2>
        <p style={p}>Submitting our enquiry or free audit form does not create a contract for services. It is an invitation for us to contact you and discuss how we may help. Any free audit or strategy session is provided for general guidance only.</p>

        <h2 style={h2}>3. No guarantee of results</h2>
        <p style={p}>Digital marketing results depend on many factors outside our control, including market conditions, competition, budget and third-party platforms. While we apply professional best practices, we do not guarantee any specific ranking, traffic, lead volume or revenue.</p>

        <h2 style={h2}>4. Use of the website</h2>
        <p style={p}>You agree not to misuse this website, including attempting to gain unauthorised access, interfering with its operation, or using it for any unlawful purpose.</p>

        <h2 style={h2}>5. Intellectual property</h2>
        <p style={p}>All content on this website — including text, graphics, logos and design — is owned by or licensed to Zeta Digital and is protected by applicable laws. You may not copy, reproduce or distribute it without our written permission.</p>

        <h2 style={h2}>6. Third-party links and platforms</h2>
        <p style={p}>Our website and services may reference or rely on third-party platforms (such as Google, Meta and WhatsApp). We are not responsible for the content, policies or availability of those third parties.</p>

        <h2 style={h2}>7. Limitation of liability</h2>
        <p style={p}>To the maximum extent permitted by law, Zeta Digital shall not be liable for any indirect, incidental or consequential loss arising from your use of this website or our services. Nothing in these Terms excludes liability that cannot be excluded under Malaysian law.</p>

        <h2 style={h2}>8. Governing law</h2>
        <p style={p}>These Terms are governed by the laws of Malaysia, and any disputes shall be subject to the exclusive jurisdiction of the courts of Malaysia.</p>

        <h2 style={h2}>9. Changes</h2>
        <p style={p}>We may update these Terms from time to time. The current version will always be posted on this page with its effective date.</p>

        <h2 style={h2}>10. Contact</h2>
        <p style={p}>Questions about these Terms? Contact us at <a href="mailto:zyric@agoh.my" style={{ color: '#4D7CFF' }}>zyric@agoh.my</a> or via WhatsApp at +60 17-792 2510.</p>

        <div style={{ marginTop: 36 }}><Link href="/" style={{ color: 'rgba(255,255,255,.55)' }}>← Back to Home</Link></div>
      </div>
    </section>
  )
}
