import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#D0FF00',
          navy: '#00033D',
          black: '#010101',
          blue: '#4D7CFF',
          violet: '#8B5CF6',
          orange: '#F0660D',
          pink: '#FF4D9D',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
