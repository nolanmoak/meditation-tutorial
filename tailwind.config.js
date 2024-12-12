/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, and TSX files in the app folder
    './src/components/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, and TSX files in the components folder]
    './src/app/(tabs)/meditate.tsx',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        rmono: ['Roboto-Mono', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
