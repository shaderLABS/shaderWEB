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
			precompress: true,
			fallback: 'index.html',
		}),
		target: '#svelte',
	},
};

export default config;
