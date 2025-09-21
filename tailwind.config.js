/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          dark: '#2E7D32',
          medium: '#4CAF50',
          light: '#81C784',
          'very-light': '#C8E6C9',
        },
        accent: {
          yellow: '#FFEB3B',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2E7D32, #4CAF50, #81C784)',
        'card-gradient': 'linear-gradient(135deg, #C8E6C9, #81C784)',
      }
    },
  },
  plugins: [],
}