// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7e22ce', // purple-700
          dark: '#6d28d9', // purple-600
        },
        secondary: {
          light: '#2563eb', // blue-600
          dark: '#1d4ed8', // blue-700
        },
        dark: {
          bg: '#0f172a', // slate-900
          text: '#e2e8f0', // slate-200
        },
        light: {
          bg: '#f8fafc', // slate-50
          text: '#1e293b', // slate-800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}