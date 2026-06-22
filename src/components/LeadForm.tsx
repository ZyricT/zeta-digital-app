'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from './LanguageProvider'

export default function LeadForm() {
  const { t } = useLang()
  const router = useRouter()
  const [pkg, setPkg] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('pkg')
    if (p) setPkg(p)
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || ''),
      whatsapp: String(fd.get('whatsapp') || ''),
      email: String(fd.get('email') || ''),
      businessType: String(fd.get('businessType') || ''),
      adBudget: String(fd.get('adBudget') || ''),
      packageInterest: String(fd.get('packageInterest') || ''),
      website: String(fd.get('website') || ''), // honeypot — humans leave blank
    }
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('bad status')
      router.push('/thank-you')
    } catch {
      setError(t('form.error'))
      setLoading(false)
    }
  }

  return (
    <form className="form-card reveal" onSubmit={onSubmit}>
      {/* honeypot: hidden from humans, bots fill it → silently rejected */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <div className="field"><label>{t('form.name')}</label><input type="text" name="name" placeholder={t('form.namePh')} required /></div>
      <div className="field"><label>{t('form.wa')}</label><input type="tel" name="whatsapp" placeholder="+60 12-345 6789" required /><div className="hint">{t('form.waHint')}</div></div>
      <div className="field"><label>{t('form.email')}</label><input type="email" name="email" placeholder="your@email.com" required /></div>
      <div className="field">
        <label>{t('form.biz')}</label>
        <select name="businessType" required defaultValue="">
          <option value="" disabled>{t('form.biz0')}</option>
          <option>{t('form.bizFnb')}</option><option>{t('form.bizBeauty')}</option><option>{t('form.bizMed')}</option>
          <option>{t('form.bizRe')}</option><option>{t('form.bizIns')}</option><option>{t('form.bizEcom')}</option><option>{t('form.bizOther')}</option>
        </select>
      </div>
      <div className="field">
        <label>{t('form.budget')}</label>
        <select name="adBudget" required defaultValue="">
          <option value="" disabled>{t('form.budget0')}</option>
          <option>{t('form.b1')}</option><option>{t('form.b2')}</option><option>{t('form.b3')}</option><option>{t('form.b4')}</option>
        </select>
      </div>
      <div className="field">
        <label>{t('form.pkg')}</label>
        <select name="packageInterest" value={pkg} onChange={(e) => setPkg(e.target.value)}>
          <option value="">{t('form.pkg0')}</option>
          <option value="basic">{t('form.pkgBasic')}</option>
          <option value="growth">{t('form.pkgGrowth')}</option>
          <option value="advanced">{t('form.pkgAdv')}</option>
          <option value="exclusive">{t('form.pkgExc')}</option>
          <option value="audit">{t('form.pkgAudit')}</option>
        </select>
      </div>
      <button className="submit" type="submit" disabled={loading}>{loading ? t('form.sending') : t('form.submit')}</button>
      <div className="privacy">{t('form.privacy')}</div>
      {error && <div className="form-note" style={{ color: '#ff6b6b' }}>{error}</div>}
    </form>
  )
}
