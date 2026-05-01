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
      colors: {
        bg: 'oklch(98% 0.005 60)',
        surface: 'oklch(96% 0.005 60)',
        'surface-2': 'oklch(94% 0.008 60)',
        ink: 'oklch(15% 0.01 60)',
        'ink-soft': 'oklch(35% 0.01 60)',
        'ink-mute': 'oklch(50% 0.01 60)',
        border: 'oklch(88% 0.01 60)',
        'border-strong': 'oklch(78% 0.01 60)',
        accent: 'oklch(45% 0.15 30)',
        'accent-soft': 'oklch(60% 0.10 30)',
        'tier-1': 'oklch(50% 0.10 165)',
        'tier-2': 'oklch(50% 0.13 250)',
        'tier-3': 'oklch(50% 0.13 50)',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        prose: '68ch',
        wide: '90ch',
      },
    },
  },
  plugins: [],
};
