// Pre-written trilingual SEO/AEO/GEO article queue for the auto-publish engine.
// The Vercel Cron route (/api/cron/publish) takes the FIRST set whose slugs are
// not yet all in Sanity, fetches a relevant Unsplash photo, and publishes EN/ZH/MS.
// Each language is localized for its own search keywords — NOT a literal translation.
//
// To add more weeks of content: append more sets to QUEUE below (same shape).

export type QPost = {
  title: string
  slug: string
  excerpt: string
  seoTitle: string
  seoDescription: string
  alt: string            // image alt text (localized, descriptive, keyword-aware)
  body: string           // markdown-ish: blank-line paragraphs, "## " = h2, "### " = h3
  faqs: { question: string; answer: string }[]
}

export type QSet = {
  group: string                          // translationGroup (same across EN/ZH/MS)
  category: { title: string; slug: string }
  unsplashQuery: string                  // keyword used to fetch the cover photo
  posts: { en: QPost; zh: QPost; ms: QPost }
}

export const QUEUE: QSet[] = [
  // ── SET 1 — Google Search Ads ───────────────────────────────────────────
  {
    group: 'google-ads-2026',
    category: { title: 'Google Ads', slug: 'google-ads' },
    unsplashQuery: 'google search marketing laptop',
    posts: {
      en: {
        title: 'Google Ads for Malaysian Businesses: A 2026 Guide to Profitable Search Campaigns',
        slug: 'google-ads-malaysia-guide',
        excerpt: 'Google Ads puts you in front of customers at the exact moment they search. Here is how Malaysian businesses run search campaigns that bring buyers, not just clicks.',
        seoTitle: 'Google Ads Malaysia 2026 | Profitable Search Campaigns — Zeta Digital',
        seoDescription: 'How Malaysian businesses run Google Search Ads that convert: keyword strategy, ad copy, bidding, landing pages and conversion tracking — managed end to end.',
        alt: 'Marketer reviewing Google Ads search campaign performance on a laptop',
        body: `When a customer types "aircon service near me" or "best confinement centre KL", they are ready to buy. Google Search Ads put your business at the very top of that result — at the exact second of intent. Done right, it is the fastest paid channel to profitable leads in Malaysia.

## Why Google Search Ads convert
Unlike social ads that interrupt people, search ads answer a question someone is actively asking. The intent is already there. Your job is to show up, match the search, and send them to a page that converts. That is why a well-run search campaign often returns leads cheaper than any other channel.

## The pieces that actually matter
Keyword strategy comes first — bid on buyer keywords, not vague browser terms, and add negative keywords to stop wasted spend. Then ad copy that matches the search and states a clear offer. Then the landing page: fast, mobile-first, one clear action. Finally, conversion tracking, so every ringgit is measured against real leads, not clicks.

## Common mistakes that burn budget
Sending all traffic to a homepage, bidding on broad terms with no negatives, ignoring mobile, and never checking the search-terms report. Each one quietly drains spend. Fixing them often doubles results without raising the budget.

## How to start in Malaysia
Begin with a tight set of high-intent keywords, a small daily budget, and proper tracking. Measure cost per lead, not cost per click. Scale only what proves profitable. Paired with WhatsApp follow-up and a strong landing page, Google Ads becomes a predictable lead machine.

Want a Google Ads setup that is measured against real leads? Start with a free audit and we will map it for your business.`,
        faqs: [
          { question: 'How much should a Malaysian business spend on Google Ads?', answer: 'Start small with a daily budget on high-intent keywords, measure cost per lead, then scale only the campaigns that prove profitable. Budget should follow results, not the other way round.' },
          { question: 'Are Google Ads better than Meta Ads?', answer: 'They serve different intents. Google captures people actively searching to buy; Meta builds demand and retargets. Most Malaysian businesses get the best results running both together.' },
          { question: 'How fast do Google Ads bring leads?', answer: 'Search ads can bring leads on day one because they target active searchers, but the first 2–4 weeks are for gathering data and optimising toward the cheapest cost per lead.' },
        ],
      },
      zh: {
        title: '马来西亚企业的 Google 广告指南:2026 年做出盈利的搜索广告',
        slug: 'google-ads-malaysia-zhinan',
        excerpt: 'Google 广告让你在客户搜索的那一刻出现在最前面。看马来西亚企业如何做出带来买家、而不只是点击的搜索广告。',
        seoTitle: 'Google 广告 马来西亚 2026 | 盈利搜索广告投放 — Zeta Digital',
        seoDescription: '马来西亚企业如何做出能成交的 Google 搜索广告:关键词策略、广告文案、出价、落地页与转化追踪,全程托管。',
        alt: '营销人员在笔记本电脑上查看 Google 搜索广告投放效果',
        body: `当客户搜索"附近冷气维修"或"吉隆坡月子中心推荐"时,他们已经准备好买了。Google 搜索广告让你出现在结果最顶端 —— 正好在客户有意向的那一秒。做对了,它是马来西亚最快带来盈利名单的付费渠道。

## 为什么搜索广告能成交
社交广告是打断别人,搜索广告则是回答别人正在主动问的问题 —— 意向本来就在那里。你要做的是出现、匹配搜索词、把人带到能成交的页面。所以一个跑得好的搜索广告,获客成本往往比其他渠道更低。

## 真正重要的几块
先是关键词策略 —— 投买家词,别投笼统的浏览词,并加上否定关键词阻止浪费。再来是匹配搜索、写清楚优惠的广告文案。然后是落地页:够快、手机优先、只有一个清晰动作。最后是转化追踪,让每一令吉都对着真实名单算账,而不是点击。

## 常见的烧钱错误
把所有流量丢去首页、投宽泛词却不加否定词、忽略手机端、从不看搜索词报告。每一项都在悄悄漏钱。修好它们,常常不加预算就能翻倍。

## 在马来西亚怎么起步
从一小组高意向关键词、小额日预算和正确追踪开始。看每个名单的成本,而不是每次点击的成本。只放大被证明盈利的部分。配合 WhatsApp 跟进和强落地页,Google 广告就成了可预测的获客机器。

想要一套对着真实名单算账的 Google 广告?先来个免费诊断,我们帮你为业务量身规划。`,
        faqs: [
          { question: '马来西亚企业投 Google 广告该花多少预算?', answer: '从高意向关键词的小额日预算起步,看每个名单的成本,再只放大被证明盈利的广告。预算跟着结果走,而不是反过来。' },
          { question: 'Google 广告比 Meta 广告好吗?', answer: '两者针对不同意向。Google 抓的是正在主动搜索要买的人;Meta 负责制造需求和再营销。多数马来西亚企业两个一起跑效果最好。' },
          { question: 'Google 广告多快能带来名单?', answer: '搜索广告第一天就可能带来名单,因为它针对正在搜索的人;但头 2–4 周主要是积累数据、优化到最低的获客成本。' },
        ],
      },
      ms: {
        title: 'Google Ads untuk Perniagaan Malaysia: Panduan 2026 Kempen Carian yang Untung',
        slug: 'google-ads-malaysia-panduan',
        excerpt: 'Google Ads meletakkan anda di hadapan pelanggan pada saat mereka mencari. Begini perniagaan Malaysia menjalankan kempen carian yang membawa pembeli, bukan sekadar klik.',
        seoTitle: 'Google Ads Malaysia 2026 | Kempen Carian Untung — Zeta Digital',
        seoDescription: 'Bagaimana perniagaan Malaysia menjalankan Google Search Ads yang menukar: strategi kata kunci, salinan iklan, bidaan, halaman pendaratan dan penjejakan penukaran.',
        alt: 'Pemasar menyemak prestasi kempen carian Google Ads pada komputer riba',
        body: `Apabila pelanggan menaip "servis aircond berdekatan" atau "pusat confinement terbaik KL", mereka sudah bersedia membeli. Google Search Ads meletakkan perniagaan anda di kedudukan teratas — tepat pada saat niat itu. Dilakukan dengan betul, ia saluran berbayar terpantas untuk lead yang menguntungkan di Malaysia.

## Kenapa iklan carian menukar
Tidak seperti iklan sosial yang mengganggu orang, iklan carian menjawab soalan yang seseorang sedang tanya secara aktif. Niat sudah ada. Tugas anda ialah muncul, padankan carian, dan hantar mereka ke halaman yang menukar. Itu sebabnya kempen carian yang baik selalu bawa lead lebih murah daripada saluran lain.

## Bahagian yang benar-benar penting
Strategi kata kunci dahulu — bida kata kunci pembeli, bukan istilah kabur, dan tambah kata kunci negatif untuk henti pembaziran. Kemudian salinan iklan yang padan dengan carian dan nyatakan tawaran jelas. Kemudian halaman pendaratan: pantas, mobile-first, satu tindakan jelas. Akhir sekali, penjejakan penukaran supaya setiap ringgit diukur terhadap lead sebenar, bukan klik.

## Kesilapan biasa yang membakar bajet
Menghantar semua trafik ke laman utama, membida istilah luas tanpa kata kunci negatif, mengabaikan mobil, dan tidak pernah menyemak laporan istilah carian. Setiap satu menyedut perbelanjaan secara senyap. Membetulkannya selalu menggandakan hasil tanpa menaikkan bajet.

## Cara bermula di Malaysia
Mula dengan set kecil kata kunci niat tinggi, bajet harian kecil, dan penjejakan betul. Ukur kos setiap lead, bukan kos setiap klik. Skala hanya yang terbukti menguntungkan. Digandingkan dengan susulan WhatsApp dan halaman pendaratan kukuh, Google Ads jadi mesin lead yang boleh diramal.

Mahu persediaan Google Ads yang diukur terhadap lead sebenar? Mulakan dengan audit percuma dan kami petakan untuk perniagaan anda.`,
        faqs: [
          { question: 'Berapa patut perniagaan Malaysia belanja untuk Google Ads?', answer: 'Mula kecil dengan bajet harian pada kata kunci niat tinggi, ukur kos setiap lead, kemudian skala hanya kempen yang terbukti untung. Bajet ikut hasil, bukan sebaliknya.' },
          { question: 'Adakah Google Ads lebih baik daripada Meta Ads?', answer: 'Keduanya melayani niat berbeza. Google menangkap orang yang sedang mencari untuk membeli; Meta membina permintaan dan retarget. Kebanyakan perniagaan Malaysia dapat hasil terbaik menjalankan kedua-duanya.' },
          { question: 'Berapa pantas Google Ads membawa lead?', answer: 'Iklan carian boleh bawa lead pada hari pertama kerana mensasarkan pencari aktif, tetapi 2–4 minggu pertama untuk kumpul data dan optimum ke kos lead termurah.' },
        ],
      },
    },
  },

  // ── SET 2 — Meta Ads (Facebook & Instagram) ─────────────────────────────
  {
    group: 'meta-ads-2026',
    category: { title: 'Meta Ads', slug: 'meta-ads' },
    unsplashQuery: 'social media instagram phone marketing',
    posts: {
      en: {
        title: 'Meta Ads in Malaysia: Turning Facebook & Instagram Scrollers into Customers',
        slug: 'meta-ads-malaysia-guide',
        excerpt: 'Facebook and Instagram are where Malaysians spend hours daily. Here is how to run Meta Ads that stop the scroll and turn cold audiences into paying customers.',
        seoTitle: 'Meta Ads Malaysia 2026 | Facebook & Instagram That Convert — Zeta Digital',
        seoDescription: 'How Malaysian businesses run Meta Ads that convert cold audiences: creative that stops the scroll, funnels, retargeting and a clear path to purchase.',
        alt: 'Person viewing an Instagram feed with social media ads on a smartphone',
        body: `Most Malaysians open Facebook or Instagram many times a day. That attention is the opportunity — and the challenge. Meta Ads do not catch people searching; they interrupt people scrolling. To win, your ad has to stop the scroll in under a second, then guide a stranger toward becoming a customer.

## Creative is 80% of the result
On Meta, the creative — the video or image and the first line — decides almost everything. A scroll-stopping hook, a clear problem, and a reason to care beat any clever targeting. Test several angles, let the best performer scale, and refresh before fatigue sets in.

## Build a funnel, not a single ad
Cold audiences rarely buy on the first touch. Show value first, then retarget people who watched, clicked, or visited with a stronger offer. Retargeting warm audiences is where Meta quietly makes most of its money for smart advertisers.

## Targeting in 2026
Meta's AI now finds buyers better than manual interest stacking. Give it a strong creative, a clear conversion event, and room to learn. Your job shifts from micro-targeting to feeding the algorithm great creative and clean signals.

## Make the click count
The best ad fails if the next step is weak. Send clicks to a fast landing page or a WhatsApp chat that replies in seconds. Match the message, reduce friction, and capture the lead while interest is hot.

Want Meta Ads that actually convert, not just collect likes? Start with a free audit and we will map the funnel for your business.`,
        faqs: [
          { question: 'Why are my Meta Ads getting likes but no sales?', answer: 'Usually the funnel ends too early. Likes mean the creative works; sales need a strong next step — a fast landing page or instant WhatsApp reply — plus retargeting of people who engaged.' },
          { question: 'How much do Meta Ads cost in Malaysia?', answer: 'Cost depends on industry and creative quality more than a fixed number. Strong creative lowers cost per result dramatically, so invest in the ad itself before raising budget.' },
          { question: 'Should I target interests manually on Meta?', answer: 'In 2026, Meta’s AI usually outperforms manual interest stacking. Give it broad targeting, a clear conversion event, and excellent creative, and let it find your buyers.' },
        ],
      },
      zh: {
        title: '马来西亚的 Meta 广告:把 Facebook 和 Instagram 的刷屏者变成客户',
        slug: 'meta-ads-malaysia-zhinan',
        excerpt: 'Facebook 和 Instagram 是马来西亚人每天耗费数小时的地方。看如何做出能让人停下滑动、把陌生受众变成付费客户的 Meta 广告。',
        seoTitle: 'Meta 广告 马来西亚 2026 | 能成交的 Facebook 与 IG 广告 — Zeta Digital',
        seoDescription: '马来西亚企业如何做出能转化陌生受众的 Meta 广告:让人停下滑动的创意、漏斗、再营销,以及通向成交的清晰路径。',
        alt: '有人在智能手机上浏览带社交广告的 Instagram 动态',
        body: `多数马来西亚人每天打开 Facebook 或 Instagram 很多次。那份注意力既是机会,也是挑战。Meta 广告抓的不是正在搜索的人,而是打断正在滑动的人。要赢,你的广告必须在一秒内让人停下滑动,再把一个陌生人引导成客户。

## 创意决定 80% 的结果
在 Meta 上,创意 —— 视频或图片,加上第一句话 —— 几乎决定一切。一个让人停下的钩子、一个清晰的痛点、一个在乎的理由,胜过任何花哨的定位。多测几个角度,让表现最好的去放大,在审美疲劳之前更新。

## 要建漏斗,不是一条广告
陌生受众很少第一次接触就买。先给价值,再对看过、点过、访问过的人用更强的优惠做再营销。对热受众再营销,正是 Meta 为聪明广告主默默赚最多钱的地方。

## 2026 年的定位
Meta 的 AI 现在找买家,比手动堆兴趣更准。给它强创意、清晰的转化事件、和学习的空间。你的工作从微定位,转为给算法喂好创意和干净信号。

## 让点击有价值
下一步太弱,再好的广告也会失败。把点击带到够快的落地页,或秒回的 WhatsApp 对话。匹配信息、减少摩擦,趁意向还热时接住名单。

想要真正能成交、而不只是收获赞的 Meta 广告?先来个免费诊断,我们帮你为业务规划漏斗。`,
        faqs: [
          { question: '为什么我的 Meta 广告有赞却没销售?', answer: '通常是漏斗结束得太早。有赞说明创意有效;成交需要强的下一步 —— 够快的落地页或秒回的 WhatsApp —— 再加上对互动过的人做再营销。' },
          { question: '在马来西亚投 Meta 广告要多少钱?', answer: '成本更多取决于行业和创意质量,而非一个固定数字。强创意会大幅降低每个结果的成本,所以加预算前先投资广告本身。' },
          { question: '在 Meta 上要手动定位兴趣吗?', answer: '在 2026 年,Meta 的 AI 通常胜过手动堆兴趣。给它较宽的定位、清晰的转化事件和出色的创意,让它去找你的买家。' },
        ],
      },
      ms: {
        title: 'Meta Ads di Malaysia: Menukar Penatal Facebook & Instagram Menjadi Pelanggan',
        slug: 'meta-ads-malaysia-panduan',
        excerpt: 'Facebook dan Instagram tempat rakyat Malaysia menghabiskan berjam-jam setiap hari. Begini menjalankan Meta Ads yang menghentikan tatal dan menukar audiens dingin jadi pelanggan.',
        seoTitle: 'Meta Ads Malaysia 2026 | Facebook & Instagram yang Menukar — Zeta Digital',
        seoDescription: 'Bagaimana perniagaan Malaysia menjalankan Meta Ads yang menukar audiens dingin: kreatif yang menghentikan tatal, funnel, retargeting dan laluan jelas ke pembelian.',
        alt: 'Seseorang melihat suapan Instagram dengan iklan media sosial pada telefon pintar',
        body: `Kebanyakan rakyat Malaysia membuka Facebook atau Instagram banyak kali sehari. Perhatian itu ialah peluang — dan cabaran. Meta Ads tidak menangkap orang yang mencari; ia mengganggu orang yang menatal. Untuk menang, iklan anda mesti menghentikan tatal dalam masa kurang sesaat, kemudian membimbing orang asing menjadi pelanggan.

## Kreatif ialah 80% hasil
Di Meta, kreatif — video atau imej dan baris pertama — menentukan hampir segalanya. Cangkuk yang menghentikan tatal, masalah jelas, dan sebab untuk ambil peduli mengatasi sebarang penyasaran bijak. Uji beberapa sudut, biar yang terbaik berskala, dan segarkan sebelum keletihan iklan berlaku.

## Bina funnel, bukan satu iklan
Audiens dingin jarang membeli pada sentuhan pertama. Tunjuk nilai dahulu, kemudian retarget orang yang menonton, klik, atau melawat dengan tawaran lebih kuat. Retargeting audiens suam ialah tempat Meta diam-diam menjana paling banyak untuk pengiklan bijak.

## Penyasaran pada 2026
AI Meta kini mencari pembeli lebih baik daripada susunan minat manual. Beri ia kreatif kuat, acara penukaran jelas, dan ruang untuk belajar. Tugas anda beralih daripada mikro-penyasaran kepada memberi algoritma kreatif hebat dan isyarat bersih.

## Jadikan klik bermakna
Iklan terbaik gagal jika langkah seterusnya lemah. Hantar klik ke halaman pendaratan pantas atau chat WhatsApp yang membalas dalam saat. Padankan mesej, kurangkan geseran, dan tangkap lead semasa minat masih panas.

Mahu Meta Ads yang benar-benar menukar, bukan sekadar kumpul like? Mulakan dengan audit percuma dan kami petakan funnel untuk perniagaan anda.`,
        faqs: [
          { question: 'Kenapa Meta Ads saya dapat like tetapi tiada jualan?', answer: 'Biasanya funnel tamat terlalu awal. Like bermakna kreatif berkesan; jualan perlukan langkah seterusnya yang kuat — halaman pendaratan pantas atau balasan WhatsApp segera — serta retargeting orang yang melibatkan diri.' },
          { question: 'Berapa kos Meta Ads di Malaysia?', answer: 'Kos bergantung pada industri dan kualiti kreatif lebih daripada nombor tetap. Kreatif kuat menurunkan kos setiap hasil secara mendadak, jadi laburkan pada iklan itu sebelum menaikkan bajet.' },
          { question: 'Perlukah saya menyasarkan minat secara manual di Meta?', answer: 'Pada 2026, AI Meta biasanya mengatasi susunan minat manual. Beri penyasaran luas, acara penukaran jelas, dan kreatif cemerlang, biar ia mencari pembeli anda.' },
        ],
      },
    },
  },

  // ── SET 3 — SEO ─────────────────────────────────────────────────────────
  {
    group: 'seo-malaysia-2026',
    category: { title: 'SEO', slug: 'seo' },
    unsplashQuery: 'seo analytics growth chart office',
    posts: {
      en: {
        title: 'SEO for Malaysian Businesses: How to Rank on Google and Get Found in 2026',
        slug: 'seo-malaysia-guide',
        excerpt: 'SEO brings customers who are already searching for what you sell — for free, every month. Here is how Malaysian businesses build rankings that compound over time.',
        seoTitle: 'SEO Malaysia 2026 | Rank on Google & Get Found — Zeta Digital',
        seoDescription: 'How Malaysian businesses rank on Google in 2026: keyword strategy, on-page SEO, content that answers buyers, local SEO and authority that compounds over time.',
        alt: 'Team reviewing SEO ranking and traffic growth charts in an office',
        body: `Ads stop the moment you stop paying. SEO does the opposite — it builds an asset that brings customers searching for what you sell, month after month, without paying per click. For Malaysian businesses, ranking on Google is one of the highest-return investments in marketing, but it rewards patience and consistency.

## Start with buyer keywords
Good SEO begins with the words your customers actually type — "halal catering Selangor", "invisalign price Malaysia", not vague industry jargon. Map each keyword to a page that answers it fully. Intent first, volume second.

## On-page basics that still win
Clear titles and meta descriptions, one focused topic per page, fast mobile loading, descriptive headings, and internal links between related pages. These fundamentals still decide most rankings — long before any advanced tactic matters.

## Content that earns the ranking
Google rewards pages that genuinely answer the searcher better than the alternatives. Write for the buyer's real question, add the details competitors skip, and keep it updated. Helpful, specific content beats thin, keyword-stuffed pages every time.

## Local and AI search in 2026
For most Malaysian businesses, local SEO — a complete Google Business Profile, reviews, and location pages — drives the nearest, highest-intent customers. And as people increasingly ask AI assistants, clear structured content makes you the source those answers cite.

Want a clear SEO plan that compounds month after month? Start with a free audit and we will map it for your business.`,
        faqs: [
          { question: 'How long does SEO take to work in Malaysia?', answer: 'Most businesses see meaningful movement in 3–6 months, with results compounding after that. SEO is a long-term asset, not an instant channel like ads.' },
          { question: 'Is SEO or Google Ads better?', answer: 'Ads buy immediate visibility; SEO builds free, compounding traffic over time. The strongest approach uses ads for speed and SEO for long-term, lower-cost leads.' },
          { question: 'Does local SEO matter for a small Malaysian business?', answer: 'Yes — a complete Google Business Profile, reviews, and location pages often bring the highest-intent nearby customers, and it is one of the fastest SEO wins available.' },
        ],
      },
      zh: {
        title: '马来西亚企业的 SEO:2026 年如何在 Google 排名、被客户找到',
        slug: 'seo-malaysia-zhinan',
        excerpt: 'SEO 带来的是本来就在搜索你产品的客户 —— 每个月免费持续。看马来西亚企业如何建立随时间复利增长的排名。',
        seoTitle: 'SEO 马来西亚 2026 | 在 Google 排名、被找到 — Zeta Digital',
        seoDescription: '马来西亚企业 2026 年如何在 Google 排名:关键词策略、页面 SEO、回答买家的内容、本地 SEO,以及随时间复利的权威度。',
        alt: '团队在办公室查看 SEO 排名与流量增长图表',
        body: `广告一停付费就停。SEO 正相反 —— 它建立的是一项资产,月复一月地带来正在搜索你产品的客户,而且不按点击付费。对马来西亚企业来说,在 Google 排名是营销里回报最高的投资之一,但它奖励耐心和持续。

## 从买家关键词开始
好的 SEO 从客户真正会打的词开始 ——"雪兰莪清真到会"、"马来西亚隐形牙套价格",而不是笼统的行业术语。把每个关键词对应到一个能完整回答它的页面。先看意向,再看搜索量。

## 仍然有效的页面基本功
清晰的标题和元描述、每页一个聚焦主题、手机端快速加载、有描述性的标题层级、相关页面之间的内部链接。这些基本功仍决定大部分排名 —— 远在任何高级技巧之前。

## 能赢得排名的内容
Google 奖励那些真正比其他页面更好地回答搜索者的页面。针对买家真实的问题来写,补上竞争对手略过的细节,并保持更新。有用、具体的内容,每次都胜过单薄、堆砌关键词的页面。

## 2026 年的本地与 AI 搜索
对多数马来西亚企业,本地 SEO —— 完整的 Google 商家资料、评价、地点页面 —— 带来最近、意向最高的客户。而随着越来越多人问 AI 助手,清晰的结构化内容会让你成为那些答案引用的来源。

想要一套月复一月复利增长的清晰 SEO 计划?先来个免费诊断,我们帮你为业务量身规划。`,
        faqs: [
          { question: 'SEO 在马来西亚要多久才见效?', answer: '多数企业在 3–6 个月看到明显变化,之后效果复利增长。SEO 是长期资产,不像广告那样即时。' },
          { question: 'SEO 和 Google 广告哪个更好?', answer: '广告买的是即时曝光;SEO 建立的是随时间复利、免费的流量。最强的做法是用广告求速度、用 SEO 求长期更低成本的名单。' },
          { question: '本地 SEO 对马来西亚小企业重要吗?', answer: '重要 —— 完整的 Google 商家资料、评价和地点页面,往往带来意向最高的附近客户,也是最快见效的 SEO 之一。' },
        ],
      },
      ms: {
        title: 'SEO untuk Perniagaan Malaysia: Cara Mendapat Ranking di Google pada 2026',
        slug: 'seo-malaysia-panduan',
        excerpt: 'SEO membawa pelanggan yang sememangnya sedang mencari apa anda jual — percuma, setiap bulan. Begini perniagaan Malaysia membina ranking yang bertokok-tokok mengikut masa.',
        seoTitle: 'SEO Malaysia 2026 | Dapat Ranking di Google & Ditemui — Zeta Digital',
        seoDescription: 'Bagaimana perniagaan Malaysia mendapat ranking di Google pada 2026: strategi kata kunci, SEO pada halaman, kandungan yang menjawab pembeli, SEO tempatan dan autoriti.',
        alt: 'Pasukan menyemak carta ranking SEO dan pertumbuhan trafik di pejabat',
        body: `Iklan berhenti saat anda berhenti membayar. SEO sebaliknya — ia membina aset yang membawa pelanggan yang mencari apa anda jual, bulan demi bulan, tanpa bayar setiap klik. Bagi perniagaan Malaysia, ranking di Google ialah salah satu pelaburan pemasaran berpulangan tertinggi, tetapi ia memberi ganjaran kepada kesabaran dan konsistensi.

## Mula dengan kata kunci pembeli
SEO yang baik bermula dengan perkataan yang pelanggan anda benar-benar taip — "katering halal Selangor", "harga invisalign Malaysia", bukan jargon industri kabur. Petakan setiap kata kunci ke halaman yang menjawabnya sepenuhnya. Niat dahulu, volum kemudian.

## Asas pada halaman yang masih menang
Tajuk dan meta description jelas, satu topik fokus setiap halaman, pemuatan mobil pantas, pengepala deskriptif, dan pautan dalaman antara halaman berkaitan. Asas ini masih menentukan kebanyakan ranking — jauh sebelum sebarang taktik lanjutan penting.

## Kandungan yang mendapat ranking
Google memberi ganjaran kepada halaman yang benar-benar menjawab pencari lebih baik daripada alternatif. Tulis untuk soalan sebenar pembeli, tambah butiran yang pesaing tinggalkan, dan kekal dikemas kini. Kandungan berguna dan khusus mengalahkan halaman nipis yang penuh kata kunci.

## Carian tempatan dan AI pada 2026
Bagi kebanyakan perniagaan Malaysia, SEO tempatan — Profil Perniagaan Google lengkap, ulasan, dan halaman lokasi — memacu pelanggan terdekat dengan niat tertinggi. Dan apabila orang semakin bertanya pembantu AI, kandungan berstruktur jelas menjadikan anda sumber yang dipetik jawapan itu.

Mahu pelan SEO jelas yang bertokok bulan demi bulan? Mulakan dengan audit percuma dan kami petakan untuk perniagaan anda.`,
        faqs: [
          { question: 'Berapa lama SEO mengambil masa untuk berfungsi di Malaysia?', answer: 'Kebanyakan perniagaan nampak pergerakan bermakna dalam 3–6 bulan, dengan hasil bertokok selepas itu. SEO ialah aset jangka panjang, bukan saluran segera seperti iklan.' },
          { question: 'SEO atau Google Ads lebih baik?', answer: 'Iklan membeli keterlihatan segera; SEO membina trafik percuma yang bertokok mengikut masa. Pendekatan terkuat guna iklan untuk kelajuan dan SEO untuk lead kos rendah jangka panjang.' },
          { question: 'Adakah SEO tempatan penting untuk perniagaan kecil Malaysia?', answer: 'Ya — Profil Perniagaan Google lengkap, ulasan, dan halaman lokasi selalu membawa pelanggan berdekatan dengan niat tertinggi, dan ia antara kemenangan SEO terpantas.' },
        ],
      },
    },
  },
]
