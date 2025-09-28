import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv, type UserConfigFn } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	// load environment variables for svelte.config.js
	Object.assign(process.env, loadEnv(mode, process.cwd()));

	return {
		plugins: [tailwindcss(), sveltekit()]
	};
}) satisfies UserConfigFn;
