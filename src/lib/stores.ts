import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const snackbar = writable<{
	content: string;
	color?: 'red' | 'green';
	timeout?: number;
}>(undefined);

export const theme = writable((browser ? localStorage.getItem('theme') || 'dark' : 'dark') as 'dark' | 'light');
theme.subscribe((value) => {
	if (browser) localStorage.setItem('theme', value);
});
