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
      },
      animation: {
        'scroll-indicator': 'scroll-indicator 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
