import type { Metadata } from 'next'
import { LOCALES, isLocale, OG_LOCALE, type Locale } from './locale'

const SITE = 'https://nothingimpossible.com.my'

type MetaText = { title: string; description: string }

// Per-route, per-language SEO copy. Each route's three versions target that
// language's real search keywords (not a literal translation).
const META: Record<string, Record<Locale, MetaText>> = {
  '': {
    en: {
      title: 'Full-Stack Digital Marketing Malaysia | SEO, Ads & AI — Zeta Digital',
      description: 'Zeta Digital runs your complete digital marketing in-house — SEO, Google Ads, Meta Ads, WhatsApp AI and Agentic AI automation. One team, every channel. Get a free audit.',
    },
    zh: {
      title: '马来西亚全栈数码营销公司 | SEO、广告与 AI — Zeta Digital',
      description: 'Zeta Digital 一手包办你的完整数码营销——SEO、Google 广告、Meta 广告、WhatsApp AI 与 Agentic AI 自动化。一个团队、全渠道。免费诊断。',
    },
    ms: {
      title: 'Agensi Pemasaran Digital Full-Stack Malaysia | SEO, Iklan & AI — Zeta Digital',
      description: 'Zeta Digital menjalankan pemasaran digital lengkap anda secara in-house — SEO, Google Ads, Meta Ads, WhatsApp AI dan automasi Agentic AI. Satu pasukan, semua saluran. Audit percuma.',
    },
  },
  services: {
    en: {
      title: 'Digital Marketing Services Malaysia — SEO, Google & Meta Ads | Zeta Digital',
      description: 'Every channel, fully managed: SEO, Google Search Ads, Meta Ads, WhatsApp marketing, email retargeting and Agentic AI automation for Malaysian businesses.',
    },
    zh: {
      title: '数码营销服务 马来西亚 — SEO、Google 与 Meta 广告 | Zeta Digital',
      description: '全渠道、全托管:SEO、Google 搜索广告、Meta 广告、WhatsApp 营销、邮件再营销与 Agentic AI 自动化,为马来西亚企业打造。',
    },
    ms: {
      title: 'Servis Pemasaran Digital Malaysia — SEO, Google & Meta Ads | Zeta Digital',
      description: 'Setiap saluran, diurus sepenuhnya: SEO, Google Search Ads, Meta Ads, pemasaran WhatsApp, email retargeting dan automasi Agentic AI untuk perniagaan Malaysia.',
    },
  },
  packages: {
    en: {
      title: 'Digital Marketing Packages & Pricing Malaysia | Zeta Digital',
      description: 'One monthly retainer, everything included. Custom-scoped digital marketing packages for Malaysian businesses. Start with a free strategy session.',
    },
    zh: {
      title: '数码营销配套与价格 马来西亚 | Zeta Digital',
      description: '一个月费,全部包含。为马来西亚企业量身定制的数码营销配套。先来一场免费策略会议。',
    },
    ms: {
      title: 'Pakej & Harga Pemasaran Digital Malaysia | Zeta Digital',
      description: 'Satu bayaran bulanan, semua disertakan. Pakej pemasaran digital disesuaikan untuk perniagaan Malaysia. Mulakan dengan sesi strategi percuma.',
    },
  },
  case: {
    en: {
      title: 'Case Studies — Real Digital Marketing Results Malaysia | Zeta Digital',
      description: 'Real results from full-stack digital marketing for Malaysian businesses across F&B, beauty, healthcare, real estate and insurance.',
    },
    zh: {
      title: '案例研究 — 马来西亚真实数码营销成果 | Zeta Digital',
      description: '为马来西亚餐饮、美容、医疗、房产与保险行业做全栈数码营销的真实成果。',
    },
    ms: {
      title: 'Kajian Kes — Hasil Pemasaran Digital Sebenar Malaysia | Zeta Digital',
      description: 'Hasil sebenar pemasaran digital full-stack untuk perniagaan Malaysia dalam F&B, kecantikan, kesihatan, hartanah dan insurans.',
    },
  },
  about: {
    en: {
      title: 'About Zeta Digital — Malaysia’s Full-Stack Marketing Team',
      description: 'Human strategy, AI execution. Zeta Digital combines proven digital marketing with Agentic AI — 100% in-house, no outsourcing.',
    },
    zh: {
      title: '关于 Zeta Digital — 马来西亚全栈营销团队',
      description: '人做策略,AI 做执行。Zeta Digital 把成熟的数码营销与 Agentic AI 结合——100% 自家执行,绝不外包。',
    },
    ms: {
      title: 'Tentang Zeta Digital — Pasukan Pemasaran Full-Stack Malaysia',
      description: 'Strategi manusia, pelaksanaan AI. Zeta Digital menggabungkan pemasaran digital terbukti dengan Agentic AI — 100% in-house, tanpa outsource.',
    },
  },
  contact: {
    en: {
      title: 'Get a Free Digital Marketing Audit | Contact Zeta Digital Malaysia',
      description: 'Tell us about your business and our team will reach out on WhatsApp within 24 hours. Free audit, no commitment.',
    },
    zh: {
      title: '获取免费数码营销诊断 | 联系 Zeta Digital 马来西亚',
      description: '告诉我们你的业务,团队会在 24 小时内通过 WhatsApp 联系你。免费诊断,无需承诺。',
    },
    ms: {
      title: 'Dapatkan Audit Pemasaran Digital Percuma | Hubungi Zeta Digital',
      description: 'Beritahu kami tentang perniagaan anda dan pasukan kami akan hubungi melalui WhatsApp dalam 24 jam. Audit percuma, tanpa komitmen.',
    },
  },
}

export function pageMetadata(route: string, langRaw: string): Metadata {
  const lang: Locale = isLocale(langRaw) ? langRaw : 'en'
  const m = META[route]?.[lang] ?? META[''][lang]
  const path = route ? `/${route}` : ''
  const languages: Record<string, string> = {
    'en-MY': `${SITE}/en${path}`,
    'zh-Hans': `${SITE}/zh${path}`,
    'ms-MY': `${SITE}/ms${path}`,
    'x-default': `${SITE}/en${path}`,
  }
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `${SITE}/${lang}${path}`, languages },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}${path}`,
      siteName: 'Zeta Digital',
      locale: OG_LOCALE[lang],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description },
  }
}

export const MARKETING_ROUTES = ['', 'services', 'packages', 'case', 'about', 'contact'] as const
export { LOCALES }
