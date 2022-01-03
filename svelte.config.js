import adapter from '@sveltejs/adapter-node';
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
			out: 'dist',
			precompress: true,
		}),
		target: '#svelte',
	},
};

export default config;
