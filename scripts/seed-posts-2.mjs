// Second trilingual article set — topic: WhatsApp AI chatbots for Malaysian businesses.
// RUN (in zeta-app folder):  SANITY_WRITE_TOKEN=your_editor_token node scripts/seed-posts-2.mjs
// Re-running is safe (fixed IDs / createOrReplace).

import { createClient } from 'next-sanity'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN. Create an Editor token at sanity.io/manage -> API -> Tokens.'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '94t96kxv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01', token, useCdn: false,
})

function toBlocks(text) {
  const out = []
  for (const para of text.trim().split(/\n\n+/)) {
    const line = para.trim(); if (!line) continue
    let style = 'normal', content = line
    if (line.startsWith('## ')) { style = 'h2'; content = line.slice(3) }
    else if (line.startsWith('### ')) { style = 'h3'; content = line.slice(4) }
    out.push({ _type: 'block', _key: Math.random().toString(36).slice(2), style, markDefs: [], children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: content, marks: [] }] })
  }
  return out
}

const now = new Date().toISOString()
const GROUP = 'whatsapp-ai-2026'

const POSTS = [
  {
    _id: 'post-whatsapp-en', language: 'en',
    title: 'WhatsApp AI Chatbots for Malaysian Businesses: The 2026 Lead-Gen Playbook',
    slug: 'whatsapp-ai-chatbot-malaysia',
    excerpt: 'Malaysians live on WhatsApp — but most businesses lose leads to slow replies. Here is how a WhatsApp AI chatbot answers in seconds, qualifies leads and books appointments 24/7.',
    seoTitle: 'WhatsApp AI Chatbot Malaysia | 24/7 Lead Capture & Booking — Zeta Digital',
    seoDescription: 'How Malaysian businesses use WhatsApp AI chatbots to reply in seconds, qualify leads, book appointments and follow up automatically — the channel customers actually use.',
    body: `In Malaysia, the sale is won or lost on WhatsApp. Customers message, expect a reply in minutes, and move on if you are slow. Most businesses still reply by hand — and quietly lose leads every night and weekend. A WhatsApp AI chatbot fixes that.

## Why WhatsApp beats email in Malaysia
Open rates on email hover around 20%; WhatsApp messages get read almost instantly. Malaysians treat WhatsApp as their default channel for business, bookings and questions. If your leads are messaging there, that is where your fastest, highest-converting funnel lives.

## What a WhatsApp AI chatbot actually does
It replies in seconds, any hour of any day. It answers common questions, qualifies the lead (budget, intent, service), books the appointment straight into your calendar, and follows up automatically if they go quiet — at 24 hours, 7 days, and a month. It can even sort enquiries to the right team.

## The cost of replying by hand
Every minute a lead waits, the chance of closing drops. After hours and on weekends — when many people actually message — manual reply means hours of delay or none at all. A chatbot turns those lost messages into booked appointments while you sleep.

## How to set it up properly
The goal is not a robotic auto-reply. A good setup uses AI to understand intent, keeps a human-like tone, escalates real buyers to your team, and logs every lead to a database. Paired with ads and SEO that drive traffic, the chatbot is the piece that actually captures the lead.

Want a WhatsApp funnel that never sleeps? Start with a free audit and we will map it for your business.`,
    faqs: [
      { question: 'What is a WhatsApp AI chatbot?', answer: 'An AI assistant on your WhatsApp business number that replies instantly, answers questions, qualifies leads, books appointments and follows up automatically, 24/7.' },
      { question: 'Why use WhatsApp instead of email in Malaysia?', answer: 'Malaysians read WhatsApp almost instantly and treat it as the default business channel, so it converts faster than email, which often goes unread.' },
      { question: 'Will a chatbot feel robotic to my customers?', answer: 'A well-built setup uses AI to understand intent and keeps a natural tone, and escalates serious buyers to a human, so it feels helpful, not robotic.' },
    ],
  },
  {
    _id: 'post-whatsapp-zh', language: 'zh',
    title: '马来西亚企业的 WhatsApp AI 客服机器人:2026 获客指南',
    slug: 'whatsapp-ai-kefu-malaysia',
    excerpt: '马来西亚人离不开 WhatsApp,但多数企业因回复慢而流失客户。看 WhatsApp AI 客服机器人如何秒回、筛选名单、自动预约,全天候不打烊。',
    seoTitle: 'WhatsApp AI 客服机器人 马来西亚 | 24小时获客预约 — Zeta Digital',
    seoDescription: '马来西亚企业如何用 WhatsApp AI 客服机器人秒回、筛选名单、自动预约与跟进——在客户真正使用的渠道上获客。',
    body: `在马来西亚,成交往往就在 WhatsApp 上决定。客户发来信息、期待几分钟内回复,慢了就走人。多数企业还在人工回复,每个夜晚和周末都在悄悄流失客户。WhatsApp AI 客服机器人正好解决这点。

## 为什么在马来西亚 WhatsApp 胜过邮件
邮件打开率约 20%;WhatsApp 几乎是秒读。马来西亚人把 WhatsApp 当作咨询、预约、买东西的默认渠道。你的名单在那里,你最快、转化最高的漏斗就在那里。

## WhatsApp AI 客服到底能做什么
它全天任何时段秒回;回答常见问题;筛选名单(预算、意向、服务);把预约直接写进你的日历;客户没回应时自动跟进(24 小时、7 天、1 个月);还能把咨询分派给对的团队。

## 人工回复的代价
客户每多等一分钟,成交几率就掉一截。下班后和周末——恰恰是很多人发信息的时候——人工回复要么拖几小时,要么没人理。机器人把这些流失的信息,在你睡觉时变成预约。

## 怎么正确搭建
目标不是死板的自动回复。好的设置用 AI 理解意向、保持自然语气、把真正的买家转给人工、并把每条名单存进数据库。再配合带来流量的广告与 SEO,客服机器人就是真正"接住"名单的那一环。

想要一个永不打烊的 WhatsApp 漏斗?先来个免费诊断,我们帮你为业务量身规划。`,
    faqs: [
      { question: '什么是 WhatsApp AI 客服机器人?', answer: '装在你 WhatsApp 商业号上的 AI 助手,秒回信息、回答问题、筛选名单、自动预约与跟进,全天候运作。' },
      { question: '在马来西亚为什么用 WhatsApp 而不是邮件?', answer: '马来西亚人几乎秒读 WhatsApp,把它当默认商业渠道,转化比常被忽略的邮件更快。' },
      { question: '机器人会让客户觉得很死板吗?', answer: '搭建得好会用 AI 理解意向、保持自然语气,并把认真的买家转给人工,体验是"有帮助"而非死板。' },
    ],
  },
  {
    _id: 'post-whatsapp-ms', language: 'ms',
    title: 'Chatbot AI WhatsApp untuk Perniagaan Malaysia: Panduan Jana Lead 2026',
    slug: 'chatbot-ai-whatsapp-malaysia',
    excerpt: 'Rakyat Malaysia hidup di WhatsApp — tetapi kebanyakan perniagaan hilang lead kerana balasan lambat. Begini chatbot AI WhatsApp membalas dalam saat, menilai lead dan menempah temujanji 24/7.',
    seoTitle: 'Chatbot AI WhatsApp Malaysia | Tangkap Lead & Tempahan 24/7 — Zeta Digital',
    seoDescription: 'Bagaimana perniagaan Malaysia guna chatbot AI WhatsApp untuk balas dalam saat, menilai lead, tempah temujanji dan susulan automatik — di saluran yang pelanggan benar-benar guna.',
    body: `Di Malaysia, jualan menang atau kalah di WhatsApp. Pelanggan menghantar mesej, jangka balasan dalam minit, dan beralih jika anda lambat. Kebanyakan perniagaan masih balas secara manual — dan diam-diam hilang lead setiap malam dan hujung minggu. Chatbot AI WhatsApp menyelesaikannya.

## Kenapa WhatsApp mengatasi emel di Malaysia
Kadar buka emel sekitar 20%; mesej WhatsApp dibaca hampir serta-merta. Rakyat Malaysia menjadikan WhatsApp saluran lalai untuk perniagaan, tempahan dan pertanyaan. Jika lead anda menghantar mesej di situ, di situlah funnel terpantas dan menukar tertinggi anda.

## Apa sebenarnya chatbot AI WhatsApp buat
Ia membalas dalam saat, bila-bila masa. Menjawab soalan lazim, menilai lead (bajet, niat, servis), menempah temujanji terus ke kalendar anda, dan susulan automatik jika mereka senyap — pada 24 jam, 7 hari dan sebulan. Ia juga boleh menyusun pertanyaan kepada pasukan yang betul.

## Kos membalas secara manual
Setiap minit lead menunggu, peluang tutup jualan menurun. Selepas waktu kerja dan hujung minggu — bila ramai sebenarnya menghantar mesej — balasan manual bermakna lambat berjam atau tiada langsung. Chatbot menukar mesej yang hilang itu kepada temujanji sementara anda tidur.

## Cara setup dengan betul
Matlamatnya bukan auto-balas robotik. Setup yang baik guna AI untuk memahami niat, kekal nada semula jadi, naikkan pembeli sebenar kepada pasukan anda, dan log setiap lead ke pangkalan data. Digandingkan dengan iklan dan SEO yang memacu trafik, chatbot ialah bahagian yang benar-benar menangkap lead.

Mahu funnel WhatsApp yang tidak pernah tidur? Mulakan dengan audit percuma dan kami petakan untuk perniagaan anda.`,
    faqs: [
      { question: 'Apa itu chatbot AI WhatsApp?', answer: 'Pembantu AI pada nombor WhatsApp business anda yang membalas serta-merta, menjawab soalan, menilai lead, menempah temujanji dan susulan automatik, 24/7.' },
      { question: 'Kenapa guna WhatsApp dan bukan emel di Malaysia?', answer: 'Rakyat Malaysia membaca WhatsApp hampir serta-merta dan menjadikannya saluran perniagaan lalai, jadi ia menukar lebih pantas daripada emel yang sering tidak dibaca.' },
      { question: 'Adakah chatbot terasa robotik kepada pelanggan?', answer: 'Setup yang baik guna AI untuk memahami niat dan kekal nada semula jadi, serta naikkan pembeli serius kepada manusia, jadi ia terasa membantu, bukan robotik.' },
    ],
  },
]

async function run() {
  await client.createOrReplace({ _id: 'category-whatsapp', _type: 'category', title: 'WhatsApp', slug: { _type: 'slug', current: 'whatsapp' } })
  for (const p of POSTS) {
    await client.createOrReplace({
      _id: p._id, _type: 'post',
      title: p.title, language: p.language, translationGroup: GROUP,
      slug: { _type: 'slug', current: p.slug },
      excerpt: p.excerpt, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
      author: 'Zeta Digital', publishedAt: now,
      categories: [{ _type: 'reference', _ref: 'category-whatsapp', _key: 'cat1' }],
      body: toBlocks(p.body),
      faqs: p.faqs.map((f, i) => ({ _type: 'object', _key: 'faq' + i, question: f.question, answer: f.answer })),
    })
    console.log('Created:', p.language, '-', p.slug)
  }
  console.log('Done. WhatsApp trilingual set created.')
}
run().catch((e) => { console.error(e); process.exit(1) })
