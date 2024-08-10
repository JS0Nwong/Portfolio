/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      animation:{
        darkColorBefore: 'darkColorBefore 1s ease 0s 1 normal forwards running ',
        darkColorAfter: 'darkColorAfter 1s ease 0s 1 normal forwards running',
        lightColorBefore: 'lightColorBefore 1s ease 0s 1 normal forwards running',
        lightColorAfter: 'lightColorAfter 1s ease 0s 1 normal forwards running',

      },
      keyframes: {
        darkColorBefore: {
          '0%' : { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgb(163 163 163)' },
          '100%': { backgroundColor: 'transparent', width: '100%' },
        },
        darkColorAfter: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgb(163 163 163)' },
          '100%': { backgroundColor: ' rgb(38 38 38)', width: '100%' },
        },
        lightColorBefore: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgb(38 38 38)' },
          '100%': { backgroundColor: 'transparent', width: '100%' },
        },
        lightColorAfter: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgb(38 38 38)' },
          '100%': { backgroundColor: 'rgb(229 229 229)', width: '100%' },
        },
      }
    },
  },
  plugins: [],
}

