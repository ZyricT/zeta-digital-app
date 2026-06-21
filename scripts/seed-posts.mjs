// One-command seed: creates a category + the first trilingual article set in Sanity.
// HOW TO RUN (on your Mac, in the zeta-app folder):
//   1) Create a Sanity write token: sanity.io/manage -> project -> API -> Tokens -> "Editor"
//   2) Run:  SANITY_WRITE_TOKEN=your_token node scripts/seed-posts.mjs
// Re-running is safe (uses fixed IDs / createOrReplace).

import { createClient } from 'next-sanity'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN env var. See instructions at top of this file.'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '94t96kxv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  token,
  useCdn: false,
})

// Convert a markdown-ish string into Sanity Portable Text blocks.
// Lines starting with "## " become H2, "### " become H3, blank line splits paragraphs.
function toBlocks(text) {
  const out = []
  for (const para of text.trim().split(/\n\n+/)) {
    const line = para.trim()
    if (!line) continue
    let style = 'normal'
    let content = line
    if (line.startsWith('## ')) { style = 'h2'; content = line.slice(3) }
    else if (line.startsWith('### ')) { style = 'h3'; content = line.slice(4) }
    out.push({ _type: 'block', _key: Math.random().toString(36).slice(2), style, markDefs: [], children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: content, marks: [] }] })
  }
  return out
}

const now = new Date().toISOString()
const GROUP = 'full-stack-2026'

const POSTS = [
  {
    _id: 'post-fullstack-en', language: 'en',
    title: 'Full-Stack Digital Marketing in Malaysia: One Team for SEO, Ads, WhatsApp AI & Automation',
    slug: 'full-stack-digital-marketing-malaysia',
    excerpt: 'Malaysian brands are trading scattered freelancers for one full-stack team that runs SEO, Google & Meta ads, WhatsApp AI and Salesforce automation end-to-end. Here is how it converts.',
    seoTitle: 'Full-Stack Digital Marketing Malaysia | SEO, Ads & WhatsApp AI — Zeta Digital',
    seoDescription: 'Complete A-Z digital marketing for Malaysian brands: SEO + GEO/AEO, Google & Meta ads, WhatsApp AI chatbots, and Salesforce automation — one in-house team.',
    body: `Most Malaysian businesses don't have a marketing problem — they have a coordination problem. One person runs the Facebook ads, a freelancer does SEO "when there's time", and nobody owns the number that matters: paying customers. Full-stack digital marketing fixes that by putting every channel under one accountable team.

## What full-stack digital marketing means
A single team owns your entire growth playbook — strategy, SEO, paid ads, content, WhatsApp and automation — instead of you stitching together specialists who never talk to each other. The stack is every layer needed to turn a stranger on Google or Instagram into a booked, paying customer.

## The hidden cost of five freelancers
On paper five freelancers look cheaper. In reality you pay three hidden taxes: the coordination tax (you become the project manager), the gap tax (leads leak between specialists with different goals), and the speed tax (every change takes weeks). One team removes all three.

## Every channel under one roof
SEO + GEO + AEO so you rank on Google and get cited by ChatGPT and Gemini. Google Search Ads to capture buyers at the moment of intent. Meta, Instagram and Xiaohongshu to create demand. WhatsApp AI chatbots that reply in seconds and book appointments. Salesforce automation for nurture and retargeting. Agentic AI tying it together 24/7.

## Why it matters in Malaysia
Malaysian buying behaviour is WhatsApp-first and increasingly AI-assisted. A strategy tuned for Malaysia — fast WhatsApp response, local SEO, the right social channels — matches how your customers actually behave, which is why it converts better than a generic playbook.

If you're tired of being the glue between five freelancers, start with a free audit and walk away with a complete, channel-by-channel plan.`,
    faqs: [
      { question: 'What is full-stack digital marketing?', answer: 'One team owning your entire growth system — SEO, ads, content, WhatsApp and automation — instead of separate freelancers, so leads do not leak between channels.' },
      { question: 'Is a full-stack agency better than freelancers?', answer: 'For most growing businesses yes: freelancers add hidden costs (you manage them, goals do not align, changes are slow). A full-stack team aligns every channel to one goal and moves faster.' },
      { question: 'Why is WhatsApp marketing so important in Malaysia?', answer: 'Malaysians prefer messaging and expect fast replies. A WhatsApp AI chatbot answers in seconds, qualifies leads and books appointments, capturing leads lost to slow response.' },
    ],
  },
  {
    _id: 'post-fullstack-zh', language: 'zh',
    title: '马来西亚全栈数码营销:SEO、广告、WhatsApp AI 与自动化一站搞定',
    slug: 'quanzhan-shuma-yingxiao-malaysia',
    excerpt: '与其拼凑多个自由职业者,越来越多马来西亚品牌选择一个全栈团队,把 SEO、Google 与 Meta 广告、WhatsApp AI 与 Salesforce 自动化端到端做完。',
    seoTitle: '马来西亚数码营销公司 | 全栈 SEO+广告+WhatsApp AI — Zeta Digital',
    seoDescription: '为马来西亚品牌提供完整 A 到 Z 数码营销:SEO+GEO/AEO、Google 与 Meta 广告、WhatsApp AI 客服、Salesforce 自动化,一个自家团队全包。',
    body: `很多马来西亚企业缺的不是营销,而是"协调":一个人投 Facebook 广告,一个外包"有空才做" SEO,却没人对真正重要的数字负责——成交客户。全栈数码营销把所有渠道交给一个负责到底的团队。

## 什么是全栈数码营销
一个团队掌握你完整的增长打法——策略、SEO、付费广告、内容、WhatsApp 与自动化——而不是让你在互不沟通的外包之间疲于奔命。所谓"全栈",就是把陌生访客变成成交客户所需的每一层。

## 拼凑外包的隐性成本
表面上多个自由职业者更便宜,实际你付三种隐性税:协调税(你变成项目经理)、空隙税(名单在目标不一致的人之间流失)、速度税(每次改动拖好几周)。一个团队把三者一次消除。

## 全渠道一站式
SEO + GEO + AEO,既在 Google 排名,也被 ChatGPT、Gemini 引用;Google 搜索广告抓住购买意图的瞬间;Meta、Instagram 与小红书创造需求;WhatsApp AI 客服秒回并自动预约;Salesforce 自动化做培育与再营销;Agentic AI 24 小时把这一切串起来。

## 为什么这在马来西亚特别重要
马来西亚消费者习惯用 WhatsApp,也越来越依赖 AI 推荐。为本地调校的策略——WhatsApp 秒回、本地化 SEO、对的社媒渠道——更贴合客户真实行为,转化自然更好。

不想再当五个外包之间的"胶水"?先来个免费诊断,带走一份逐渠道的完整方案。`,
    faqs: [
      { question: '什么是全栈数码营销?', answer: '一个团队掌管你完整的增长系统——SEO、广告、内容、WhatsApp 与自动化——而不是分散的外包,名单不会在渠道之间流失。' },
      { question: '全栈团队比请自由职业者好吗?', answer: '对大多数成长中的企业是的:外包有隐性成本(你要管理、目标不一致、改动慢)。全栈团队把所有渠道对齐同一目标,行动更快。' },
      { question: '为什么 WhatsApp 营销在马来西亚这么重要?', answer: '马来西亚人偏好即时通讯且期待快速回复。WhatsApp AI 客服秒回、筛选名单、自动预约,抓住因回复慢而流失的客户。' },
    ],
  },
  {
    _id: 'post-fullstack-ms', language: 'ms',
    title: 'Pemasaran Digital Full-Stack di Malaysia: Satu Pasukan untuk SEO, Iklan, WhatsApp AI & Automasi',
    slug: 'pemasaran-digital-full-stack-malaysia',
    excerpt: 'Jenama Malaysia beralih daripada pelbagai freelancer kepada satu pasukan full-stack yang menjalankan SEO, iklan Google & Meta, WhatsApp AI dan automasi Salesforce hujung ke hujung.',
    seoTitle: 'Agensi Pemasaran Digital Malaysia | SEO, Iklan & WhatsApp AI — Zeta Digital',
    seoDescription: 'Pemasaran digital lengkap A-Z untuk jenama Malaysia: SEO + GEO/AEO, iklan Google & Meta, chatbot AI WhatsApp dan automasi Salesforce — satu pasukan dalaman.',
    body: `Kebanyakan perniagaan Malaysia bukan ada masalah pemasaran — mereka ada masalah penyelarasan. Seorang uruskan iklan Facebook, freelancer buat SEO "bila ada masa", dan tiada siapa bertanggungjawab pada nombor yang penting: pelanggan membayar. Pemasaran digital full-stack menyelesaikannya dengan satu pasukan yang bertanggungjawab sepenuhnya.

## Apa itu pemasaran digital full-stack
Satu pasukan menguasai keseluruhan strategi pertumbuhan anda — strategi, SEO, iklan berbayar, kandungan, WhatsApp dan automasi — bukannya anda menggabungkan pakar yang tidak pernah berhubung. "Stack" ialah setiap lapisan untuk menukar orang asing di Google atau Instagram kepada pelanggan yang menempah.

## Kos tersembunyi lima freelancer
Di atas kertas lima freelancer nampak lebih murah. Realitinya anda bayar tiga cukai tersembunyi: cukai penyelarasan (anda jadi project manager), cukai jurang (lead bocor antara pakar yang matlamatnya berbeza), dan cukai kelajuan (setiap perubahan ambil berminggu). Satu pasukan menghapuskan ketiga-tiganya.

## Setiap saluran di bawah satu bumbung
SEO + GEO + AEO untuk rank di Google dan dipetik oleh ChatGPT dan Gemini. Iklan Carian Google menangkap pembeli pada saat niat. Meta, Instagram dan Xiaohongshu mencipta permintaan. Chatbot AI WhatsApp membalas dalam saat dan menempah temujanji. Automasi Salesforce untuk pemupukan dan retargeting. Agentic AI menyatukan semuanya 24/7.

## Mengapa ia penting di Malaysia
Tingkah laku pembelian Malaysia adalah WhatsApp-first dan semakin dibantu AI. Strategi yang ditala untuk Malaysia — respons WhatsApp pantas, SEO setempat, saluran sosial yang betul — sepadan dengan cara pelanggan anda sebenarnya bertindak, sebab itu ia menukar lebih baik.

Penat jadi "gam" antara lima freelancer? Mulakan dengan audit percuma dan bawa pulang pelan saluran demi saluran yang lengkap.`,
    faqs: [
      { question: 'Apa itu pemasaran digital full-stack?', answer: 'Satu pasukan menguasai seluruh sistem pertumbuhan anda — SEO, iklan, kandungan, WhatsApp dan automasi — bukan freelancer berasingan, jadi lead tidak bocor antara saluran.' },
      { question: 'Adakah agensi full-stack lebih baik daripada freelancer?', answer: 'Untuk kebanyakan perniagaan membesar, ya: freelancer ada kos tersembunyi (anda urus mereka, matlamat tak sejajar, perubahan lambat). Pasukan full-stack menjajarkan semua saluran ke satu matlamat dan bergerak lebih pantas.' },
      { question: 'Mengapa pemasaran WhatsApp penting di Malaysia?', answer: 'Rakyat Malaysia suka pemesejan dan jangkakan balasan pantas. Chatbot AI WhatsApp membalas dalam saat, menilai lead dan menempah temujanji, menangkap lead yang hilang akibat respons lambat.' },
    ],
  },
]

async function run() {
  await client.createOrReplace({ _id: 'category-strategy', _type: 'category', title: 'Strategy', slug: { _type: 'slug', current: 'strategy' } })
  for (const p of POSTS) {
    await client.createOrReplace({
      _id: p._id, _type: 'post',
      title: p.title, language: p.language, translationGroup: GROUP,
      slug: { _type: 'slug', current: p.slug },
      excerpt: p.excerpt, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
      author: 'Zeta Digital', publishedAt: now,
      categories: [{ _type: 'reference', _ref: 'category-strategy', _key: 'cat1' }],
      body: toBlocks(p.body),
      faqs: p.faqs.map((f, i) => ({ _type: 'object', _key: 'faq' + i, question: f.question, answer: f.answer })),
    })
    console.log('Created:', p.language, '-', p.slug)
  }
  console.log('Done. 3 trilingual posts + category created.')
}

run().catch((e) => { console.error(e); process.exit(1) })
