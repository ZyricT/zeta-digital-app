'use client'

import dynamic from 'next/dynamic'

// Load the Sanity Studio only on the client — it relies on React context
// and cannot be server-rendered / prerendered.
const StudioInner = dynamic(() => import('./StudioInner'), {
  ssr: false,
  loading: () => (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060608', color: '#D0FF00', fontFamily: 'monospace' }}>
      Loading Studio…
    </div>
  ),
})

export default function Studio() {
  return <StudioInner />
}
