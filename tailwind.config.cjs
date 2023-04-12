/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': {
        100: '#7c6f64',
        200: '#665c54',
        300: '#4d4846',
        400: '#3c3836',
        500: '#313131',
        600: '#1d2021',
      },
      'white': {
        100: '#e4e4e4',
        200: '#fbf1c7',
        300: '#ebdbb2',
        400: '#d5c4a1',
        500: '#bdae93',
        600: '#a89984',
      },
      'red': {
        100: '#fb4934',
        200: '#cc241d',
      },
      'green': {
        100: '#b8bb26',
        200: '#98971a',
      },
      'yellow': {
        100: '#fabd2f',
        200: '#d79921',
      },
      'blue': {
        100: '#83a598',
        200: '#458588',
      },
      'purple': {
        100: '#d3869b',
        200: '#b16286',
      },
      'aqua': {
        100: '#8ec07c',
        200: '#689d6a',
      },
      'gray': {
        100: '#a89984',
        200: '#928347',
      },
      'orange': {
        100: '#fe8019',
        200: '#cb642c',
      }
    },
  },
  plugins: [
    // @ts-ignore
    require('tailwind-scrollbar-hide')
  ],
};

module.exports = config;
