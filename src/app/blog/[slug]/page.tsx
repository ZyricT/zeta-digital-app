import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPost, getAllSlugs, getTranslations, urlFor } from '@/sanity/client'
import PostBody from '@/components/PostBody'

export const revalidate = 60

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs()
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null)
  if (!post) return { title: 'Blog | Zeta Digital' }
  const title = post.seoTitle || `${post.title} | Zeta Digital`
  const description = post.seoDescription || post.excerpt || ''
  const images = post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : []
  const trans = post.translationGroup ? await getTranslations(post.translationGroup).catch(() => []) : []
  const languages: Record<string, string> = {}
  trans.forEach((tr) => { if (tr.language && tr.slug) languages[tr.language] = `https://nothingimpossible.com.my/blog/${tr.slug}` })
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}`, languages: Object.keys(languages).length ? languages : undefined },
    openGraph: { title, description, type: 'article', publishedTime: post.publishedAt, images },
    twitter: { card: 'summary_large_image', title, description },
  }
}

function fmtDate(d?: string) {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return '' }
}

export default async function PostPage({ params }: Params) {
  const post = await getPost(params.slug).catch(() => null)
  if (!post) notFound()

  const url = `https://nothingimpossible.com.my/blog/${post.slug}`
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title, description: post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined,
    datePublished: post.publishedAt, dateModified: post._updatedAt || post.publishedAt,
    author: { '@type': 'Organization', name: 'Zeta Digital', url: 'https://nothingimpossible.com.my' },
    publisher: { '@type': 'Organization', name: 'Zeta Digital', logo: { '@type': 'ImageObject', url: 'https://nothingimpossible.com.my/icon-512.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nothingimpossible.com.my' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://nothingimpossible.com.my/blog' },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  }
  const faqSchema = post.faqs?.length
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
    : null

  return (
    <section className="sec page-hero">
      <div className="glow g-blue gtr" />
      <div className="wrap" style={{ maxWidth: 760 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

        <div style={{ fontFamily: "'Space Mono'", fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 18 }}>
          <Link href="/">Home</Link> → <Link href="/blog">Blog</Link> → {post.title}
        </div>
        {post.categories?.[0] && <span className="cat">{post.categories[0]}</span>}
        <h1 style={{ fontSize: 'clamp(30px,5vw,52px)', margin: '14px 0 16px' }}>{post.title}</h1>
        {post.excerpt && <p className="lead" style={{ fontSize: 18 }}>{post.excerpt}</p>}
        <div style={{ fontFamily: "'Space Mono'", fontSize: 12, color: 'rgba(255,255,255,.4)', margin: '14px 0 28px' }}>
          {fmtDate(post.publishedAt)} · {post.author || 'Zeta Digital'}
        </div>
        {post.mainImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={urlFor(post.mainImage).width(1200).height(675).url()} alt={post.mainImage?.alt || post.title} style={{ width: '100%', borderRadius: 12, marginBottom: 32 }} />
        )}

        <PostBody value={post.body} />

        {post.faqs?.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px,3vw,32px)', marginBottom: 20 }}>Frequently Asked Questions</h2>
            {post.faqs.map((f: any, i: number) => (
              <details key={i} style={{ borderTop: '1px solid rgba(255,255,255,.1)', padding: '16px 0' }}>
                <summary style={{ cursor: 'pointer', color: '#fff', fontWeight: 600, fontSize: 16 }}>{f.question}</summary>
                <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 15, lineHeight: 1.7, marginTop: 10 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        )}

        <div style={{ marginTop: 48, background: 'rgba(208,255,0,.06)', border: '1px solid rgba(208,255,0,.15)', borderRadius: 16, padding: 32 }}>
          <p style={{ fontSize: 18, marginBottom: 18, color: '#fff' }}>Ready to grow with full-stack digital marketing + AI?</p>
          <Link href="/contact" className="btn btn-primary">Get a Free Audit →</Link>
        </div>

        <div style={{ marginTop: 32 }}><Link href="/blog" style={{ color: 'rgba(255,255,255,.55)' }}>← Back to Blog</Link></div>
      </div>
    </section>
  )
}
