/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#D4537E',
          dark:    '#72243E',
          mid:     '#F4C0D1',
          light:   '#FBEAF0',
        },
        cream: {
          DEFAULT: '#FAF8F6',
          dark:    '#F0EDE8',
        },
        ink: {
          DEFAULT: '#2C2C2A',
          muted:   '#888780',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans:  ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        kicker: ['10px', { letterSpacing: '0.18em' }],
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
}
