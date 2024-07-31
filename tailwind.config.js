import { palettes } from '@tailus/themer';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@tailus/themer/dist/components/**/*.{js,ts}',
	],
	theme: {
		extend: {
			colors: palettes.trust,
		},
	},
	plugins: [],
};
