/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'darkbg': "#08090b",
        'darkmbg': "#0c0d11",
        'darkfg': "#dcdee6",
        'darkerror': "#e0626c",
        'darksuccess': "#60ae7f",
        'darkpr': "#7095db",
        'darkpink': "#f06595",
        'darkwarn': "#cb795f",
      },
      screens: {
        'sm': '576px',
        // => @media (min-width: 576px) { ... }

        'md': '960px',
        // => @media (min-width: 960px) { ... }

        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
      },
      lineHeight: {
        'extra-loose': '2.5',
        '14': '3rem',
      },
      height: {
        'fuller': '140vh',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#5c7cfa",
          "secondary": "#7190ed",
          "accent": "#f06595",
          "neutral": "#0c0d11",
          "base-100": "#08090b",
          "success": "#60ae7f",
          "warning": "#cb795f",
          "error": "#e0626c",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms'),],
}
