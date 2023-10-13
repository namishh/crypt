/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
          "neutral": "#090909",
          "base-100": "#010101",
          "info": "#20c997",
          "success": "#40c057",
          "warning": "#fab005",
          "error": "#ff6b6b",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms'),],
}
