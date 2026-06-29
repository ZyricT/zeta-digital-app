import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Zeta Digital',
  description: 'How Zeta Digital collects, uses and protects your personal data under Malaysia’s PDPA 2010.',
  alternates: { canonical: 'https://nothingimpossible.com.my/privacy' },
  robots: { index: true, follow: true },
}

const UPDATED = '27 June 2026'

const h2: React.CSSProperties = { color: '#fff', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(20px,3vw,26px)', margin: '40px 0 14px' }
const p: React.CSSProperties = { color: 'rgba(255,255,255,.7)', fontSize: 16, lineHeight: 1.8, margin: '0 0 14px' }
const li: React.CSSProperties = { color: 'rgba(255,255,255,.7)', fontSize: 16, lineHeight: 1.8 }

export default function PrivacyPage() {
  return (
    <section className="sec page-hero">
      <div className="glow g-blue gtr" />
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div style={{ fontFamily: "'Space Mono'", fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>
          <Link href="/">Home</Link> → Privacy Policy
        </div>
        <h1 style={{ fontSize: 'clamp(34px,6vw,56px)', margin: '6px 0 8px' }}>Privacy Policy</h1>
        <p style={{ color: 'rgba(255,255,255,.4)', fontFamily: "'Space Mono'", fontSize: 13, marginBottom: 8 }}>Last updated: {UPDATED}</p>

        <p style={p}>This Privacy Policy explains how Zeta Digital (“we”, “us”, “our”) collects, uses, discloses and protects your personal data when you visit nothingimpossible.com.my or submit an enquiry to us. We handle personal data in accordance with Malaysia’s Personal Data Protection Act 2010 (PDPA).</p>

        <h2 style={h2}>1. Information we collect</h2>
        <p style={p}>When you submit our enquiry / audit form, we collect: your name, WhatsApp number, email address, business type, monthly advertising budget and the package you are interested in. When you browse the site, we automatically collect standard analytics data such as IP address, device and browser type, pages viewed and referring source, via cookies and similar technologies.</p>

        <h2 style={h2}>2. How we use your data</h2>
        <ul>
          <li style={li}>To respond to your enquiry and contact you on WhatsApp or email.</li>
          <li style={li}>To provide, scope and deliver our digital marketing services.</li>
          <li style={li}>To send you relevant follow-up and marketing communications (you may opt out at any time).</li>
          <li style={li}>To measure and improve our website, content and campaigns.</li>
        </ul>

        <h2 style={h2}>3. Consent</h2>
        <p style={p}>By submitting our form or contacting us, you consent to us collecting and processing your personal data for the purposes above. You may withdraw your consent at any time by contacting us (see Section 8).</p>

        <h2 style={h2}>4. Disclosure to third parties</h2>
        <p style={p}>We do not sell your personal data. We share it only with trusted service providers who help us operate, such as our email delivery provider (Resend), website hosting (Vercel), content management (Sanity), analytics (Google Analytics) and WhatsApp messaging providers. These providers process data on our behalf under appropriate safeguards.</p>

        <h2 style={h2}>5. Cookies & analytics</h2>
        <p style={p}>We use Google Analytics 4 and Google Tag Manager to understand how visitors use our site. These set cookies that collect anonymised usage data. You can control cookies through your browser settings.</p>

        <h2 style={h2}>6. Data retention</h2>
        <p style={p}>We retain your personal data only for as long as necessary to fulfil the purposes set out in this policy, or as required by law, after which it is securely deleted.</p>

        <h2 style={h2}>7. Your rights under the PDPA</h2>
        <p style={p}>You have the right to request access to and correction of your personal data, to limit its processing, and to withdraw consent to receiving marketing. To exercise these rights, contact us using the details below.</p>

        <h2 style={h2}>8. Contact us</h2>
        <p style={p}>For any privacy questions or requests, contact us at <a href="mailto:zyric@agoh.my" style={{ color: '#4D7CFF' }}>zyric@agoh.my</a> or via WhatsApp at +60 17-792 2510.</p>

        <h2 style={h2}>9. Changes to this policy</h2>
        <p style={p}>We may update this Privacy Policy from time to time. The latest version will always be posted on this page with its effective date.</p>

        <div style={{ marginTop: 36 }}><Link href="/" style={{ color: 'rgba(255,255,255,.55)' }}>← Back to Home</Link></div>
      </div>
    </section>
  )
}
