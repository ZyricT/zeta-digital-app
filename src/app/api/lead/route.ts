import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface LeadData {
  name: string
  whatsapp: string
  email: string
  businessType: string
  adBudget: string
  packageInterest: string
  timestamp: string
}

async function sendWhatsApp(data: LeadData): Promise<void> {
  const token = process.env.WABLAS_TOKEN
  if (!token) { console.warn('[lead] WABLAS_TOKEN not set — skipping WhatsApp'); return }
  const axios = (await import('axios')).default
  const message =
    `🔥 NEW LEAD — Nothing Impossible\n\n` +
    `Name: ${data.name}\nWhatsApp: ${data.whatsapp}\nEmail: ${data.email}\n` +
    `Business: ${data.businessType}\nBudget: ${data.adBudget}\nPackage: ${data.packageInterest}\n` +
    `Time: ${data.timestamp}`
  await axios.post(
    'https://my.wablas.com/api/send-message',
    { phone: '60177922510', message },
    { headers: { Authorization: token }, timeout: 8000 }
  )
}

async function sendEmail(data: LeadData): Promise<void> {
  const key = process.env.RESEND_API_KEY
  if (!key) { console.warn('[lead] RESEND_API_KEY not set — skipping email'); return }
  const { Resend } = await import('resend')
  const resend = new Resend(key)
  const from = process.env.LEAD_FROM_EMAIL || 'leads@nothingimpossible.com.my'
  const to = process.env.LEAD_TO_EMAIL || 'zyric@agoh.my'
  await resend.emails.send({
    from,
    to,
    subject: `New Lead: ${data.name} — ${data.businessType} — ${data.packageInterest}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
        <h2 style="color:#00033D;margin-bottom:24px;">New Lead from Nothing Impossible</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">WhatsApp</td><td style="padding:8px 0;font-weight:600;">${data.whatsapp}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;font-weight:600;">${data.email}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Business Type</td><td style="padding:8px 0;">${data.businessType}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Ad Budget</td><td style="padding:8px 0;">${data.adBudget}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Package</td><td style="padding:8px 0;"><strong>${data.packageInterest}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666;">Time</td><td style="padding:8px 0;">${data.timestamp}</td></tr>
        </table>
      </div>`,
  })
}

async function appendSheet(data: LeadData): Promise<void> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!raw || !sheetId) { console.warn('[lead] Google Sheets env not set — skipping Sheet'); return }
  const { google } = await import('googleapis')
  const credentials = JSON.parse(raw)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const sheets = google.sheets({ version: 'v4', auth })
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Leads!A:H',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        data.timestamp, data.name, data.whatsapp, data.email,
        data.businessType, data.adBudget, data.packageInterest, 'nothingimpossible.com.my',
      ]],
    },
  })
}

function isEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const required = ['name', 'whatsapp', 'email', 'businessType', 'adBudget'] as const
    for (const f of required) {
      if (!body?.[f] || typeof body[f] !== 'string' || !body[f].trim()) {
        return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 })
      }
    }
    if (!isEmail(String(body.email).trim())) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    // basic length guard against abuse
    for (const f of required) {
      if (String(body[f]).length > 200) {
        return NextResponse.json({ error: 'Field too long' }, { status: 400 })
      }
    }

    const data: LeadData = {
      name: String(body.name).trim(),
      whatsapp: String(body.whatsapp).trim(),
      email: String(body.email).trim(),
      businessType: String(body.businessType).trim(),
      adBudget: String(body.adBudget).trim(),
      packageInterest: (body.packageInterest ? String(body.packageInterest).trim() : '') || 'Not specified',
      timestamp: new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' }),
    }

    const results = await Promise.allSettled([sendWhatsApp(data), sendEmail(data), appendSheet(data)])
    const failures = results.filter((r) => r.status === 'rejected')
    if (failures.length) console.error('[lead] some channels failed:', failures)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[lead] error:', err)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
