/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Microcopy, captions
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
        'xs':  ['0.8125rem', { lineHeight: '1.5' }],
        // Body
        'sm':  ['0.9375rem', { lineHeight: '1.55' }],
        'base': ['1.0625rem', { lineHeight: '1.6' }],
        // Lead paragraph
        'lg':  ['1.1875rem', { lineHeight: '1.55' }],
        'xl':  ['1.375rem',  { lineHeight: '1.45' }],
        // Section headings
        '2xl': ['1.625rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        '3xl': ['2.125rem',  { lineHeight: '1.1',  letterSpacing: '-0.018em' }],
        '4xl': ['2.75rem',   { lineHeight: '1.05', letterSpacing: '-0.022em' }],
        // Hero / display
        '5xl': ['3.75rem',   { lineHeight: '1.0',  letterSpacing: '-0.028em' }],
        '6xl': ['4.5rem',    { lineHeight: '0.95', letterSpacing: '-0.032em' }],
      },
      colors: {
        // Cool-tinted neutrals (hue 220) — harmonize with Jane's teal palette
        bg: 'oklch(98% 0.003 220)',
        surface: 'oklch(96% 0.005 220)',
        'surface-2': 'oklch(93% 0.01 220)',
        ink: 'oklch(18% 0.008 220)',
        'ink-soft': 'oklch(38% 0.008 220)',
        'ink-mute': 'oklch(52% 0.008 220)',
        border: 'oklch(88% 0.008 220)',
        'border-strong': 'oklch(76% 0.01 220)',
        // Jane-aligned accent: deep teal #027989 + supporting tones
        accent: 'oklch(48% 0.08 205)',
        'accent-strong': 'oklch(40% 0.08 205)',
        'accent-soft': 'oklch(72% 0.13 205)',
        'accent-tint': 'oklch(94% 0.03 205)',
        // Tier colors (semantic; kept differentiated for meaning)
        'tier-1': 'oklch(48% 0.10 165)',
        'tier-2': 'oklch(48% 0.13 250)',
        'tier-3': 'oklch(48% 0.13 50)',
      },
      maxWidth: {
        prose: '68ch',
        wide: '90ch',
      },
    },
  },
  plugins: [],
};
