const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

import type {Config} from 'tailwindcss';

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
				primary: {
					'blackish': '#222222',
					'whiteish': '#FEFEFE',
					'vanilla': '#FAEFDE',
					'grey': '#40403B',
					'grey-brighter': '#5D5D56',
				},
				secondary: {
					'green': '#BCE5AE',
					'green-darker': '#739966',
				},
				accent: {
					'green': '#BCD3BB',
					'brown': '#D3C4BB',
					'yellow': '#D1D3BB',
					'blue': '#BBCCD3',
				},
			},
			maxWidth: {
				'8xl': '90rem', // 1440 px
				'9xl': '100rem', // 1600 px
				'10xl': '100rem', // 1760 px
			},
			fontFamily: {
				'sans': ['Inter', 'sans-serif'],
			},
			fontSize: {
				'8.5xl': '6.5rem',
				'9.5xl': '10rem',
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

			'animation': {
				shimmer: 'shimmer 2s linear infinite 0.5s',
			},
			'keyframes': {
				shimmer: {
					from: {
						'backgroundPosition': '0 0',
					},
					to: {
						'backgroundPosition': '-200% 0',
					},
				},
			},
		},
	},
	plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({addBase, theme}: any) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	);

	addBase({
		':root': newVars,
	});
}

export default config;
