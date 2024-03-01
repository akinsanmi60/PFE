/** @type {import('tailwindcss').Config} */

const customColors = {
  primary: {
    main: '#1A1A1A',
    light: '#999999',
    lighter: '#666666',
    white: '#FFFFFF',
  },
  secondary: {
    'light-1': '#2AA232',
    'light-2': '#333333',
  },
  tertiary: {
    main: '#FF8A00',
    'light-1': '#FFF3E6',
    'light-2': '#4D4D4D',
    'light-3': '#666666',
  },
  statusText: {
    success: '#0CAF60',
    error: '#E03137',
  },
  background: {
    main: '#072723',
    light: '#6AD871',
    borderlight: '#F2F2F2',
    'borderlight-1': '#F1F2F4',
  },
  gray: {
    50: '#9ca3af',
    100: '#F1F2F4',
    400: '#64748B',
    500: '#475569',
    600: '#334155',
    700: '#1E293B',
    800: '#0F172A',
    900: '#101828',
  },
  'cancel-red': {
    main: '#CF142B',
    light: {
      2: '#F0B6BD',
    },
  },
  light: {
    3: '#6C6C6C',
    4: '#2D2D2D',
  },
  disabledState: '#CCCCFF',
};

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    colors: {
      ...customColors,
    },
    fontFamily: {
      playfair: ['Playfair Display'],
      primary: ['Inter', 'sans-serif'],
    },
    screens: {
      xxlA: { min: '1440px' },
      xl: { max: '1279px' },
      lg: { max: '1028px' },
      minlg: { max: '1024px' },
      mdxl: { max: '950px' },
      md: { max: '834px' },
      sixm: { max: '768px' },
      xlsm: { max: '550px' },
      sm: { max: '375px' },
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
