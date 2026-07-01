// Case studies — Agoh/Swapper + AFFT Club, trilingual, EDITABLE in Studio (not hardcoded).
// Real figures only. Testimonials are faithful paraphrases attributed to the named person
// (editable in Studio). AFFT quote = Mr Jack, Director of AFFT Club.
// RUN (in zeta-app folder):  SANITY_WRITE_TOKEN=your_editor_token node scripts/seed-case-studies.mjs
// Re-running is safe (fixed IDs / createOrReplace).

import { createClient } from 'next-sanity'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN. Create an Editor token at sanity.io/manage -> API -> Tokens.'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '94t96kxv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01', token, useCdn: false,
})

const CASES = [
  // ───────────────────────── AGOH / SWAPPER (order 0) ─────────────────────────
  {
    _id: 'case-agoh-en', language: 'en', translationGroup: 'agoh', order: 0,
    client: 'Agoh Marketing (Swapper Malaysia)',
    industry: 'Used Phone Retail',
    packageName: 'Exclusive Full-Stack',
    headline: 'From 10K to 100K+ leads in 18 months',
    summary: 'Swapper Malaysia buys and sells second-hand phones across the Klang Valley. Over an 18-month exclusive full-stack engagement, Zeta rebuilt their entire growth engine — turning a regional reseller into a name that AI assistants now recommend by default.',
    challenge: 'A regional second-hand phone reseller with steady walk-ins — but no digital engine and no Chinese-speaking market.',
    approach: 'Zeta rebuilt the full stack: Google Ads, Meta Ads, a 24/7 WhatsApp AI chatbot, and a brand-new Chinese-language market from zero.',
    metrics: [
      { value: '100K+', label: 'Monthly leads (up from 10K)' },
      { value: '+220%', label: 'Chinese-speaking customers' },
      { value: '90%', label: 'WhatsApp enquiries auto-handled 24/7' },
      { value: '300K+', label: 'Google Ads impressions / month' },
    ],
    testimonialQuote: "Zeta's Google Ads bring us steady walk-ins, and we're happy with how the leads convert.",
    testimonialAuthor: 'Lt. Kol (PA) Goh Pei Kiat',
    testimonialRole: 'Founder & CEO, Agoh Marketing',
  },
  {
    _id: 'case-agoh-zh', language: 'zh', translationGroup: 'agoh', order: 0,
    client: 'Agoh Marketing(Swapper Malaysia)',
    industry: '二手手机买卖',
    packageName: '独家全栈',
    headline: '18 个月，Leads 从 1 万到 10 万+',
    summary: 'Swapper Malaysia 在雪隆区收购与买卖二手手机。在 18 个月的独家全栈合作中，Zeta 重建了他们的整个增长引擎，把一个区域性回收商做成连 AI 助手都会主动推荐的品牌。',
    challenge: '一家区域二手手机商，有稳定 walk-in —— 却没有数字引擎，也没打开中文市场。',
    approach: 'Zeta 重建整个全栈：Google Ads、Meta Ads、7×24 WhatsApp AI 客服，并从零开拓中文市场。',
    metrics: [
      { value: '10万+', label: '每月 Leads（从 1 万起）' },
      { value: '+220%', label: '中文客户增长' },
      { value: '90%', label: 'WhatsApp 咨询 7×24 自动处理' },
      { value: '30万+', label: 'Google Ads 每月曝光' },
    ],
    testimonialQuote: 'Zeta 的 Google Ads 带来稳定的 Walk In，Leads 的转化我们也很满意。',
    testimonialAuthor: 'Lt. Kol (PA) Goh Pei Kiat',
    testimonialRole: '创办人兼 CEO，Agoh Marketing',
  },
  {
    _id: 'case-agoh-ms', language: 'ms', translationGroup: 'agoh', order: 0,
    client: 'Agoh Marketing (Swapper Malaysia)',
    industry: 'Peruncitan Telefon Terpakai',
    packageName: 'Full-Stack Eksklusif',
    headline: 'Dari 10K ke 100K+ lead dalam 18 bulan',
    summary: 'Swapper Malaysia membeli dan menjual telefon terpakai di sekitar Lembah Klang. Sepanjang 18 bulan kerjasama full-stack eksklusif, Zeta membina semula seluruh enjin pertumbuhan mereka — menjadikan peruncit serantau ini nama yang kini turut dicadangkan oleh pembantu AI.',
    challenge: 'Peruncit telefon terpakai serantau dengan walk-in tetap — tetapi tiada enjin digital dan tiada pasaran berbahasa Cina.',
    approach: 'Zeta membina semula full-stack: Google Ads, Meta Ads, chatbot AI WhatsApp 24/7, dan pasaran berbahasa Cina baharu dari kosong.',
    metrics: [
      { value: '100K+', label: 'Lead sebulan (dari 10K)' },
      { value: '+220%', label: 'Pelanggan berbahasa Cina' },
      { value: '90%', label: 'Pertanyaan WhatsApp auto 24/7' },
      { value: '300K+', label: 'Tera Google Ads / bulan' },
    ],
    testimonialQuote: 'Google Ads daripada Zeta membawa walk-in yang stabil, dan kami berpuas hati dengan penukaran lead.',
    testimonialAuthor: 'Lt. Kol (PA) Goh Pei Kiat',
    testimonialRole: 'Pengasas & CEO, Agoh Marketing',
  },

  // ───────────────────────── AFFT CLUB (order 1) ─────────────────────────
  {
    _id: 'case-afft-en', language: 'en', translationGroup: 'afft', order: 1,
    client: 'AFFT Club (Adventure Frontier Freedom Travel)',
    industry: 'Sabah Outdoor Travel',
    packageName: 'Growth + Free GBP Consulting',
    headline: "Diagnosing why viral content wasn't converting",
    summary: 'AFFT Club runs camping experiences, gear rental and private tours across Sabah. In a focused 2-month engagement, Zeta diagnosed a critical gap left by the previous agency and rebuilt the foundation.',
    challenge: 'A new Sabah outdoor brand with viral TikTok and RED videos — but the reach never turned into real bookings.',
    approach: 'Zeta took over from the previous agency, pinpointed the gap (Google Business Profile disconnected from social), set up GBP and delivered a 3-month strategy.',
    metrics: [
      { value: '2-mo', label: 'Diagnosis & repositioning sprint' },
      { value: 'GBP', label: 'Set up & aligned to social content' },
      { value: '3-mo', label: 'Strategy roadmap delivered' },
    ],
    testimonialQuote: "Zeta quickly found why our viral content wasn't converting — our Google presence was disconnected from our social. In two months they rebuilt that foundation.",
    testimonialAuthor: 'Mr Jack',
    testimonialRole: 'Director, AFFT Club',
  },
  {
    _id: 'case-afft-zh', language: 'zh', translationGroup: 'afft', order: 1,
    client: 'AFFT Club（Adventure Frontier Freedom Travel）',
    industry: '沙巴户外旅游',
    packageName: 'Growth 配套 + 免费 GBP 顾问',
    headline: '诊断：为什么爆红内容没带来生意',
    summary: 'AFFT Club 在沙巴经营露营体验、装备租借与私人导览。在为期 2 个月的合作中，Zeta 诊断出前任代理留下的关键断层，并重建了地基。',
    challenge: '一个新创沙巴户外品牌，TikTok 和小红书短视频爆红 —— 但流量从没变成实际预订。',
    approach: 'Zeta 从前任代理手中接手，诊断出核心断层（Google 商家资料与社媒脱节），设立 GBP 并交付 3 个月策略。',
    metrics: [
      { value: '2 个月', label: '诊断与重新定位' },
      { value: 'GBP', label: '设立并对接社媒内容' },
      { value: '3 个月', label: '数字营销策略蓝图' },
    ],
    testimonialQuote: 'Zeta 很快找出我们爆红内容为何没转化 —— 我们的 Google 呈现与社媒脱节。两个月内他们重建了这块地基。',
    testimonialAuthor: 'Mr 杰克',
    testimonialRole: 'Director，AFFT Club',
  },
  {
    _id: 'case-afft-ms', language: 'ms', translationGroup: 'afft', order: 1,
    client: 'AFFT Club (Adventure Frontier Freedom Travel)',
    industry: 'Pelancongan Luar Sabah',
    packageName: 'Growth + Perundingan GBP Percuma',
    headline: 'Mendiagnosis kenapa kandungan viral tak menukar',
    summary: 'AFFT Club mengendalikan pengalaman berkhemah, sewaan peralatan dan pelancongan persendirian di Sabah. Dalam kerjasama 2 bulan, Zeta mendiagnosis jurang kritikal yang ditinggalkan agensi terdahulu dan membina semula asasnya.',
    challenge: 'Jenama luar Sabah baharu dengan video TikTok dan RED viral — tetapi jangkauan tidak pernah jadi tempahan sebenar.',
    approach: 'Zeta mengambil alih daripada agensi terdahulu, mengenal pasti jurang (Profil Perniagaan Google terputus daripada sosial), menyediakan GBP dan menyampaikan strategi 3 bulan.',
    metrics: [
      { value: '2-bln', label: 'Diagnosis & reposisi' },
      { value: 'GBP', label: 'Disedia & diselaras dgn sosial' },
      { value: '3-bln', label: 'Pelan strategi disampaikan' },
    ],
    testimonialQuote: "Zeta cepat menemui kenapa kandungan viral kami tak menukar — kehadiran Google kami terputus daripada sosial. Dalam dua bulan mereka membina semula asas itu.",
    testimonialAuthor: 'Mr Jack',
    testimonialRole: 'Pengarah, AFFT Club',
  },
]

async function run() {
  for (const c of CASES) {
    await client.createOrReplace({ _type: 'caseStudy', ...c })
    console.log('✓ seeded', c._id)
  }
  console.log('\nDone. 2 case studies × 3 languages =', CASES.length, 'docs.')
}
run().catch((e) => { console.error(e); process.exit(1) })
