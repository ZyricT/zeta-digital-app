const ITEMS = [
  ['SEO', true], ['GOOGLE ADS', false], ['META ADS', true], ['XHS 小红书', false],
  ['WHATSAPP AI', true], ['SALESFORCE', false], ['AGENTIC AI', true],
] as const

export default function Marquee() {
  const row = (
    <>
      {ITEMS.map(([txt, hot], i) => (
        <span key={i}>
          <span className={hot ? 'hot' : ''}>{txt}</span>
          <span>·</span>
        </span>
      ))}
    </>
  )
  return (
    <div className="marquee">
      <div className="track">{row}{row}</div>
    </div>
  )
}
