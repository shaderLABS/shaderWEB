import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const dark = writable(!browser || localStorage.getItem('dark') !== 'false');

dark.subscribe((value) => {
	if (!browser) return;

	localStorage.setItem('dark', value ? 'true' : 'false');
	document.documentElement.classList.toggle('dark', value);
});
