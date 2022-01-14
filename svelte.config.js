import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			scss: {
				includePaths: ['theme'],
			},
		}),
	],

	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			precompress: true,
		}),
		target: '#svelte',
		ssr: false,
	},
};

export default config;
