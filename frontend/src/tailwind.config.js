/** @type {import('t
 * ailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   // Enable dark mode with class strategy
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.1)'
          },
        }
      }
    },
  },
  plugins: [],
}