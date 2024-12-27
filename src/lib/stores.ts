import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const dark = writable(!browser || localStorage.getItem('dark') === 'true');

dark.subscribe((value) => {
	if (!browser) return;

	localStorage.setItem('dark', value ? 'true' : 'false');

	if (value) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
});
