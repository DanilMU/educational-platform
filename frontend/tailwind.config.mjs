/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './src/middleware.ts',
  ],
}

export default config;