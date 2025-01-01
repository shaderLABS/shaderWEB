import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv, type UserConfigFn } from 'vite';

export default defineConfig(({ mode }) => {
	// load environment variables for svelte.config.js
	Object.assign(process.env, loadEnv(mode, process.cwd()));

	return {
		plugins: [sveltekit()]
	};
}) satisfies UserConfigFn;
