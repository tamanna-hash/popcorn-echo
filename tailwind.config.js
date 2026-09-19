/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#05060a',
          900: '#0a0c14',
          800: '#11131f',
          700: '#191c2b',
        },
        glow: {
          violet: '#8b6bff',
          cyan: '#3fe0d0',
          amber: '#f5c451',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139, 107, 255, 0.45)',
        'glow-cyan': '0 0 40px -12px rgba(63, 224, 208, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
