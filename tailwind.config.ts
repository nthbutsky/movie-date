import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'scroll-indicator': {
          '0%': {
            'top': '0%',
            'opacity': '0',
          },
          '100%': {
            'top': '60%',
            'opacity': '1',
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
        'fade-in-spinner': {
          '0%': {
            'opacity': '0',
          },
          '100%': {
            'opacity': '1',
          },
        },
        'fade-in-layout': {
          '0%': {
            'opacity': '0',
          },
          '100%': {
            'opacity': '0.75',
          },
        },
        'slide-out': {
          '0%': {
            'transform': 'translateY(-70px)',
            'opacity': '0',
          },
          '50%': {
            'transform': 'translateY(-70px)',
            'opacity': '0',
          },
          '100%': {
            'transform': 'translateY(0)',
            'opacity': '1',
          },
        },
        'slide-on': {
          '0%': {
            'transform': 'translateY(35%)',
            'opacity': '0',
          },
          '50%': {
            'transform': 'translateY(35%)',
            'opacity': '1',
          },
          '75%': {
            'transform': 'translateY(35%)',
            'opacity': '1',
          },
          '100%': {
            'transform': 'translateY(0)',
            'opacity': '1',
          },
        }
      },
      animation: {
        'scroll-indicator': 'scroll-indicator 1s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-in-spinner': 'fade-in-spinner .3s ease-in-out',
        'fade-in-layout': 'fade-in-layout 3s ease-in-out',
        'slide-out': 'slide-out 2s ease-in-out',
        'slide-on': 'slide-on 4s ease-in-out',
      },
      boxShadow: {
        'glow': '0px 0px 12px 0px',
      }
    },
  },
  plugins: [],
};
export default config;

