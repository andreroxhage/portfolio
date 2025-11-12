const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        customShadow: '0 45px 70.8px -48px rgba(0, 0, 0, 0.95)',
      },
      colors: {
        // Custom brand colors (preserved)
        brand: {
          blackish: '#222222',
          whiteish: '#FEFEFE',
          vanilla: '#FAEFDE',
          grey: '#40403B',
          'grey-brighter': '#5D5D56',
          cream: '#EBE1D1',
        },
        secondary: {
          green: '#BCE5AE',
          'green-darker': '#739966',
          'green-lighter': '#D3E9C2',
        },
        custom: {
          green: '#BCD3BB',
          brown: '#D3C4BB',
          yellow: '#D1D3BB',
          blue: '#BBCCD3',
        },

        // Complete color system
        primary: {
          '50': '#F4F9F0',
          '100': '#E7F3DD',
          '200': '#D3E9C2',
          '300': '#B8DDA5',
          '400': '#9CC988',
          '500': '#88C075',
          '600': '#7DAA6F',
          '700': '#739966',
          '800': '#5D7D52',
          '900': '#4A6542',
          '950': '#2D3D28',
        },
        accent: {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#fed7aa',
          '300': '#fdba74',
          '400': '#fb923c',
          '500': '#f97316',
          '600': '#ea580c',
          '700': '#c2410c',
          '800': '#9a3412',
          '900': '#7c2d12',
          '950': '#431407',
        },
        gray: {
          '50': '#fafafa',
          '100': '#f5f5f5',
          '200': '#e5e5e5',
          '300': '#d4d4d4',
          '400': '#a3a3a3',
          '500': '#737373',
          '600': '#525252',
          '700': '#404040',
          '800': '#262626',
          '900': '#171717',
          '950': '#0a0a0a',
        },
        neutral: {
          '50': '#faf9f7',
          '100': '#f1eeea',
          '200': '#e4ddd4',
          '300': '#d1c7ba',
          '400': '#b9aa98',
          '500': '#a08d7a',
          '600': '#8a7667',
          '700': '#726157',
          '800': '#5f514a',
          '900': '#50453f',
          '950': '#2a2420',
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        '8.5xl': '6.5rem',
        '9.5xl': '10rem',
      },
      borderRadius: {
        '4xl': '28px  ',
      },
      top: {
        '18': '-4.5rem',
        '104': '28rem',
      },
      screens: {
        '3xl': '1600px',
      },
      right: {
        '1/5': '20%',
      },
      borderWidth: {
        '1': '1px',
      },

      animation: {
        shimmer: 'shimmer 2s linear infinite 0.5s',
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}

export default config;
