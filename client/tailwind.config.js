/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px', 
    },
    extend: {  
      height:{
        "min-full": "95%",
      },
      width:{
        "min-full": "95%",
      },
      colors:{ 
        'primary': "#eb384b",
        "secondary" : '#6469ff',
      },
      dropShadow:{
        // 'full':'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        move:{
          '0%, 100%': { transform: 'translateY(-40px)' },
          '50%': { transform: 'translateY(10px)' },
        }, 
        activate: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1)' },
        } 
      }, 
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        'move-slow': 'move 5s linear infinite',
        'activate-fast': 'activate 0.5s ',
      }
    },
  },
  plugins: [],
}