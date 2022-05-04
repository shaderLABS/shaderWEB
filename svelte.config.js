import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			scss: {
				includePaths: ['theme'],
			},
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter({
			precompress: false,
			fallback: 'index.html',
		}),
	},
};

export default config;
