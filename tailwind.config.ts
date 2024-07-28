import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      keyframes: {
        'scroll-indicator': {
          '0%': {
            'top': '0%',
            'opacity': '1',
          },
          '100%': {
            'top': '60%',
            'opacity': '0',
          },
        },
        'fade-in': {
          '0%': {
            'opacity': '0',
          },
          '100%': {
            'opacity': '1',
          },
        },
        'fade-in-delayed': {
          '0%': {
            'opacity': '0',
          },
          '100%': {
            'opacity': '0.75',
          },
        }
      },
      animation: {
        'scroll-indicator': 'scroll-indicator 1s ease-in-out infinite',
        'fade-in': 'fade-in 2s ease-in-out',
        'fade-in-delayed': 'fade-in-delayed 4s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;