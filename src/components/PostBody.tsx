import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/client'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 style={{ color: '#fff', fontFamily: "'Space Grotesk','Noto Sans SC'", fontWeight: 700, fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '-.02em', margin: '48px 0 20px' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ color: '#fff', fontFamily: "'Space Grotesk','Noto Sans SC'", fontWeight: 700, fontSize: 22, margin: '36px 0 16px' }}>{children}</h3>,
    normal: ({ children }) => <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 17, lineHeight: 1.8, margin: '0 0 24px' }}>{children}</p>,
    blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid #D0FF00', paddingLeft: 24, margin: '32px 0', color: 'rgba(255,255,255,.55)', fontStyle: 'italic' }}>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: '#fff', fontWeight: 600 }}>{children}</strong>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const ext = href.startsWith('http')
      return <a href={href} style={{ color: '#4D7CFF', textDecoration: 'underline' }} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>{children}</a>
    },
  },
  list: {
    bullet: ({ children }) => <ul style={{ color: 'rgba(255,255,255,.72)', paddingLeft: 24, margin: '0 0 24px', lineHeight: 1.8 }}>{children}</ul>,
    number: ({ children }) => <ol style={{ color: 'rgba(255,255,255,.72)', paddingLeft: 24, margin: '0 0 24px', lineHeight: 1.8 }}>{children}</ol>,
  },
  types: {
    image: ({ value }) => (
      <figure style={{ margin: '40px 0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urlFor(value).width(760).url()} alt={value?.alt || ''} style={{ width: '100%', borderRadius: 8 }} />
        {value?.caption && <figcaption style={{ color: 'rgba(255,255,255,.35)', fontSize: 13, textAlign: 'center', marginTop: 12 }}>{value.caption}</figcaption>}
      </figure>
    ),
  },
}

export default function PostBody({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
