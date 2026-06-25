'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useLang } from './LanguageProvider'
import { type Lang } from '@/lib/i18n'
import Logo from './Logo'
import { WA_LINK } from '@/lib/wa'

const NAV: { href: string; key: string }[] = [
  { href: '/services', key: 'nav.services' },
  { href: '/packages', key: 'nav.packages' },
  { href: '/case', key: 'nav.case' },
  { href: '/about', key: 'nav.about' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/contact', key: 'nav.contact' },
]
const LANGS: Lang[] = ['en', 'zh', 'ms']
const LANG_LABEL: Record<Lang, string> = { en: 'EN', zh: '中', ms: 'BM' }

declare global { interface Window { THREE?: any } }

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()
  const isStudio = (pathname || '').startsWith('/studio')
  const stackRef = useRef<HTMLDivElement>(null)
  const bgReady = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // close the mobile menu whenever the route changes
  useEffect(() => { setMenuOpen(false) }, [pathname])
  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ---- custom cursor (desktop only) + header scroll, bound once ----
  useEffect(() => {
    if (isStudio) return
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches
    let raf = 0
    if (fine) {
      document.body.classList.add('custom-cursor')
      const dot = document.querySelector<HTMLElement>('.cursor-dot')
      const ring = document.querySelector<HTMLElement>('.cursor-ring')
      let mx = 0, my = 0, rx = 0, ry = 0
      const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px' } }
      window.addEventListener('mousemove', move)
      const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' } raf = requestAnimationFrame(loop) }
      loop()
      const onScroll = () => stackRef.current?.classList.toggle('scrolled', window.scrollY > 80)
      window.addEventListener('scroll', onScroll)
      return () => { window.removeEventListener('mousemove', move); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
    } else {
      const onScroll = () => stackRef.current?.classList.toggle('scrolled', window.scrollY > 80)
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // ---- per-route interactivity: reveal, tilt, magnetic, cursor-hover, count-up, AI orb ----
  useEffect(() => {
    if (isStudio) return
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches
    const cleanups: (() => void)[] = []
    const timer = setTimeout(() => {
      // reveal
      const io = new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in')
          if (en.target.classList.contains('reveal-stagger')) {
            Array.from(en.target.children).forEach((c, i) => { (c as HTMLElement).style.transitionDelay = (i * 0.07) + 's' })
          }
          en.target.querySelectorAll<HTMLElement>('[data-count]').forEach(runCount)
          if ((en.target as HTMLElement).hasAttribute('data-count')) runCount(en.target as HTMLElement)
          io.unobserve(en.target)
        }
      }), { threshold: .14 })
      document.querySelectorAll('.reveal,.reveal-stagger').forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())

      // tilt
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
        const mm = (e: MouseEvent) => { const r = card.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; card.style.transform = `perspective(700px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(6px)` }
        const ml = () => { card.style.transform = '' }
        card.addEventListener('mousemove', mm); card.addEventListener('mouseleave', ml)
        cleanups.push(() => { card.removeEventListener('mousemove', mm); card.removeEventListener('mouseleave', ml) })
      })

      // magnetic buttons
      document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
        const mm = (e: MouseEvent) => { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)` }
        const ml = () => { btn.style.transform = '' }
        btn.addEventListener('mousemove', mm); btn.addEventListener('mouseleave', ml)
        cleanups.push(() => { btn.removeEventListener('mousemove', mm); btn.removeEventListener('mouseleave', ml) })
      })

      // cursor hover targets
      if (fine) {
        const ring = document.querySelector<HTMLElement>('.cursor-ring')
        const on = () => ring?.classList.add('hover')
        const off = () => ring?.classList.remove('hover')
        document.querySelectorAll('a,button,input,select,.srow,.card,.case,.post').forEach((el) => {
          el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off)
          cleanups.push(() => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off) })
        })
      }

      // AI orb (if present on this page)
      const orb = document.getElementById('ai-canvas') as HTMLCanvasElement | null
      if (orb && window.THREE && !(orb as any)._init) cleanups.push(initOrb(orb))

      // cinematic 06: kinetic text reveal
      document.querySelectorAll('.kline').forEach((k) => k.classList.add('in'))

      // cinematic 01: parallax hero (desktop), depth amplified +30%
      const pxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]'))
      if (fine && pxEls.length) {
        const pm = (e: MouseEvent) => {
          const mx = e.clientX / window.innerWidth - .5
          const my = e.clientY / window.innerHeight - .5
          pxEls.forEach((el) => {
            const d = (parseFloat(el.dataset.depth || '0')) * 1.3
            el.style.transform = `translate(${mx * d}px,${my * d}px)`
          })
        }
        window.addEventListener('mousemove', pm)
        cleanups.push(() => window.removeEventListener('mousemove', pm))
      }
    }, 60)
    return () => { clearTimeout(timer); cleanups.forEach((c) => c()) }
  }, [pathname, lang])

  // ---- WebGL background once Three is ready ----
  const startBg = () => {
    if (bgReady.current || !window.THREE) return
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null
    if (!canvas) return
    bgReady.current = true
    initBg(canvas)
  }

  if (isStudio) return <>{children}</>

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
        onLoad={startBg}
      />
      <canvas id="bg-canvas" />
      <div className="noise" />
      <div className="cursor-ring" />
      <div className="cursor-dot" />

      <div className="topstack" ref={stackRef}>
        <div className="topbar"><span className="pulse" /><span>{t('topbar')}</span></div>
        <header>
          <div className="wrap nav">
            <Link href={`/${lang}`} className="logo" aria-label="Zeta Digital"><Logo idSuffix="hdr" /></Link>
            <div className="nav-right">
              <nav className="nav-links">
                {NAV.map((n) => {
                  const href = n.href === '/blog' ? '/blog' : `/${lang}${n.href}`
                  return (
                    <Link key={n.href} href={href} className={`navlink${pathname === href ? ' active' : ''}`}>{t(n.key)}</Link>
                  )
                })}
              </nav>
              <div className="langsw">
                {LANGS.map((l) => (
                  <button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>{LANG_LABEL[l]}</button>
                ))}
              </div>
              <Link className="btn btn-primary hdr-cta" href={`/${lang}/contact`} style={{ padding: '11px 18px' }}>{t('nav.cta')}</Link>
              <button
                className={`burger${menuOpen ? ' open' : ''}`}
                aria-label="Menu" aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className={`mm-backdrop${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-label="Mobile">
        <button className="mm-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        {NAV.map((n) => {
          const href = n.href === '/blog' ? '/blog' : `/${lang}${n.href}`
          return (
            <Link key={n.href} href={href} className={pathname === href ? 'active' : ''}>{t(n.key)}</Link>
          )
        })}
        <Link className="btn btn-primary" href={`/${lang}/contact`}>{t('nav.cta')}</Link>
      </nav>

      <main id="view">{children}</main>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <Link href={`/${lang}`} className="logo" aria-label="Zeta Digital"><Logo idSuffix="ft" /></Link>
              <p style={{ marginTop: 12, color: 'rgba(255,255,255,.3)' }}>{t('foot.tagline')}</p>
              <p style={{ color: 'rgba(255,255,255,.2)' }}>nothingimpossible.com.my</p>
            </div>
            <div>
              <div className="ft">{t('foot.quick')}</div>
              <Link href={`/${lang}/services`}>{t('nav.services')}</Link>
              <Link href={`/${lang}/packages`}>{t('nav.packages')}</Link>
              <Link href={`/${lang}/about`}>{t('nav.about')}</Link>
              <Link href={`/${lang}/contact`}>{t('nav.cta')}</Link>
            </div>
            <div>
              <div className="ft">{t('foot.contact')}</div>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">+60 17-792 2510 (WhatsApp)</a>
              <p>zyric@agoh.my</p>
              <p style={{ color: 'rgba(255,255,255,.25)' }}>{t('foot.country')}</p>
            </div>
          </div>
          <div className="foot-bottom"><span>{t('foot.copy')}</span><span>{t('foot.legal')}</span></div>
        </div>
      </footer>

      <a className="wa-float" href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C5 9.5 9.9 4.6 16 4.6S27 9.5 27 15.6 22.1 24.8 16 24.8zm6.1-7.1c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.3 2.4 3.7 5.8 5.1.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.4z"/>
        </svg>
      </a>
    </>
  )
}

function runCount(el: HTMLElement) {
  if (el.dataset.done) return
  el.dataset.done = '1'
  const target = parseFloat(el.dataset.count || '0') || 0
  const suf = el.dataset.suffix || '', pre = el.dataset.prefix || ''
  if (isNaN(target)) { el.textContent = pre + (el.dataset.count || '') + suf; return }
  const t0 = performance.now(), dur = 1300
  const tick = (now: number) => {
    const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3), cur = target * e
    el.textContent = pre + (target % 1 === 0 ? Math.round(cur) : cur.toFixed(1)) + suf
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function initBg(canvas: HTMLCanvasElement): void {
  const THREE = window.THREE
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(window.innerWidth, window.innerHeight)
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .1, 100); camera.position.z = 22
  const isMobile = window.matchMedia('(max-width:760px)').matches
  const COUNT = isMobile ? 420 : 1300, geo = new THREE.BufferGeometry(), pos = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT * 3; i++) pos[i] = (Math.random() - .5) * 72
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const points = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xD0FF00, size: .09, transparent: true, opacity: .5 })); scene.add(points)
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(7, 1), new THREE.MeshBasicMaterial({ color: 0x4D7CFF, wireframe: true, transparent: true, opacity: .2 })); scene.add(ico)
  const ico2 = new THREE.Mesh(new THREE.IcosahedronGeometry(4.4, 0), new THREE.MeshBasicMaterial({ color: 0xD0FF00, wireframe: true, transparent: true, opacity: .13 })); scene.add(ico2)
  let tx = 0, ty = 0, sy = 0
  const mm = (e: MouseEvent) => { tx = e.clientX / window.innerWidth - .5; ty = e.clientY / window.innerHeight - .5 }
  const sc = () => { sy = window.scrollY }
  const rs = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) }
  window.addEventListener('mousemove', mm); window.addEventListener('scroll', sc); window.addEventListener('resize', rs)
  const animate = () => {
    requestAnimationFrame(animate)
    points.rotation.y += .0006; points.rotation.x += .0003; ico.rotation.x += .0015; ico.rotation.y += .002; ico2.rotation.x -= .0025; ico2.rotation.y += .003
    camera.position.x += (tx * 4 - camera.position.x) * .04; camera.position.y += (-ty * 4 - camera.position.y) * .04; camera.position.z = 22 + sy * .003; camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
  }
  animate()
}

function initOrb(canvas: HTMLCanvasElement): () => void {
  const THREE = window.THREE
  ;(canvas as any)._init = 1
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(55, 1, .1, 100); camera.position.z = 10
  const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 2), new THREE.MeshBasicMaterial({ color: 0x4D7CFF, wireframe: true, transparent: true, opacity: .55 })); scene.add(sphere)
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 0), new THREE.MeshBasicMaterial({ color: 0xD0FF00, wireframe: true, transparent: true, opacity: .8 })); scene.add(core)
  const size = () => { const r = canvas.parentElement!.getBoundingClientRect(); renderer.setSize(r.width, r.height); camera.aspect = r.width / r.height; camera.updateProjectionMatrix() }
  size(); window.addEventListener('resize', size)
  let raf = 0
  const a = () => { raf = requestAnimationFrame(a); sphere.rotation.y += .004; sphere.rotation.x += .002; core.rotation.y -= .01; core.rotation.x += .006; renderer.render(scene, camera) }
  a()
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size) }
}
