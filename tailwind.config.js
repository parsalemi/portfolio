/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      'sm': '576px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    boxShadow: {
      1: '0 1px 3px hsla(0, 0%, 0%, .3)',
      2: '0 4px 6px hsla(0, 0%, 0%, .3)',
      3: '0 5px 15px hsla(0, 0%, 0%, .3)',
      4: '0 10px 24px hsla(0, 0%, 0%, .3)',
      5: '0 15px 35px hsla(0, 0%, 0%, .3)',
      'primary-1': '0 1px 3px var(--primary-900)',
      'primary-2': '0 4px 6px var(--primary-900)',
      'primary-3': '0 5px 15px var(--primary-900)',
      'primary-4': '0 10px 24px var(--primary-900)',
      'primary-5': '0 15px 35px var(--primary-900)',
      'input-inset-dark': 'inset 0 2px 5px var(--basic-1000), inset 0 -2px 5px var(--basic-700)',
      'input-inset-light': 'inset 0 2px 5px var(--basic-600), inset 0 -2px 5px var(--basic-1000)',
      'none': '0 0 0 #000',
    },

    colors:{
      primary:{
        100: 'var(--primary-100)',
        200: 'var(--primary-200)',
        300: 'var(--primary-300)',
        400: 'var(--primary-400)',
        500: 'var(--primary-500)',
        600: 'var(--primary-600)',
        700: 'var(--primary-700)',
        800: 'var(--primary-800)',
        900: 'var(--primary-900)',
        DEFAULT: 'var(--primary-600)',
      },
      basic: {
        100: 'var(--basic-100)',
        200: 'var(--basic-200)',
        300: 'var(--basic-300)',
        400: 'var(--basic-400)',
        500: 'var(--basic-500)',
        600: 'var(--basic-600)',
        700: 'var(--basic-700)',
        800: 'var(--basic-800)',
        900: 'var(--basic-900)',
        1000: 'var(--basic-1000)',
        1100: 'var(--basic-1100)',
        "100-tr-10": 'var(--basic-100-tr-10)',
        "100-tr-30": 'var(--basic-100-tr-30)',
        "100-tr-50": 'var(--basic-100-tr-50)',
        "100-tr-60": 'var(--basic-100-tr-60)',
        "100-tr-80": 'var(--basic-100-tr-80)',
        "700-tr-10": 'var(--basic-700-tr-10)',
        "700-tr-30": 'var(--basic-700-tr-30)',
        "700-tr-50": 'var(--basic-700-tr-50)',
        "700-tr-60": 'var(--basic-700-tr-60)',
        "700-tr-80": 'var(--basic-700-tr-80)',
        DEFAULT: 'var(--basic-100)',
      },
      success:{
        100: 'var(--success-100)',
        200: 'var(--success-200)',
        300: 'var(--success-300)',
        400: 'var(--success-400)',
        500: 'var(--success-500)',
        600: 'var(--success-600)',
        700: 'var(--success-700)',
        800: 'var(--success-800)',
        900: 'var(--success-900)',
        DEFAULT: 'var(--success-500)',
      },
      error:{
        100: 'var(--error-100)',
        200: 'var(--error-200)',
        300: 'var(--error-300)',
        400: 'var(--error-400)',
        500: 'var(--error-500)',
        600: 'var(--error-600)',
        700: 'var(--error-700)',
        800: 'var(--error-800)',
        900: 'var(--error-900)',
        DEFAULT: 'var(--error-500)',
      },
      warning:{
        100: 'var(--warning-100)',
        200: 'var(--warning-200)',
        300: 'var(--warning-300)',
        400: 'var(--warning-400)',
        500: 'var(--warning-500)',
        600: 'var(--warning-600)',
        700: 'var(--warning-700)',
        800: 'var(--warning-800)',
        900: 'var(--warning-900)',
        DEFAULT: 'var(--warning-300)',
      },
    },
    extend: {
      dropShadow:{
        neon: '0px 0px 5px white'
      },
      fontSize: {
        'h1': ['var(--h1-fontSize)', {lineHeight: 'var(--h1-lineHeight)'}],
        'h2': ['var(--h2-fontSize)', {lineHeight: 'var(--h2-lineHeight)'}],
        'h3': ['var(--h3-fontSize)', {lineHeight: 'var(--h3-lineHeight)'}],
        'h4': ['var(--h4-fontSize)', {lineHeight: 'var(--h4-lineHeight)'}],
        'h5': ['var(--h5-fontSize)', {lineHeight: 'var(--h5-lineHeight)'}],
        'xl': ['var(--xl-fontSize)', {lineHeight: 'var(--xl-lineHeight)'}],
        'lg': ['var(--lg-fontSize)', {lineHeight: 'var(--lg-lineHeight)'}],
        'md': ['var(--md-fontSize)', {lineHeight: 'var(--md-lineHeight)'}],
        'sm': ['var(--sm-fontSize)', {lineHeight: 'var(--sm-lineHeight)'}],
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ matchUtilities }) => {
      matchUtilities({
        'group': (value) => ({
          [`@apply ${value.replaceAll(',', ' ')}`]: {}
        })
      })
    })
  ],
}
