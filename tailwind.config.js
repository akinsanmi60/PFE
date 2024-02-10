/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    fontFamily: {
      playfair: ['Playfair Display'],
      babablu: ['Montserrat'],
    },
    screens: {
      xxlA: { min: '1440px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1028px' },
      // => @media (max-width: 1023px) { ... }
      minlg: { max: '1024px' },
      // => @media (max-width: 1023px) { ... }

      mdxl: { max: '950px' },

      md: { max: '834px' },

      // => @media (min-width: 7px) { ... }
      sixm: { max: '768px' },

      xlsm: { max: '550px' },
      // => @media (max-width: 550px) { ... }

      sm: { max: '375px' },
      // => @media (max-width: 639px) { ... }
    },
    container: {
      screens: {
        sm: '100%',
        md: '100%',
      },
    },
    extend: {
      maxWidth: {
        '8xl': '1980px',
      },
    },
  },

  plugins: [
    // require('@tailwindcss/line-clamp'),
    require('autoprefixer'),
    require('tailwind-scrollbar'),
  ],
};
