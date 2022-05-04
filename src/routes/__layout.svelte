<script lang="ts">
	import { page } from '$app/stores';
	import { decodeError } from '$lib/api';
	import { snackbar, theme } from '$lib/stores';
	import { AppBar, Button, Footer, Icon, MaterialAppMin, Snackbar } from 'svelte-materialify/src';

	let snackbarVisible = false;
	snackbar.subscribe((value) => (snackbarVisible = !!value));

	const errorCode = $page.url.searchParams.get('error');
	if (errorCode) $snackbar = { content: decodeError(errorCode) };
</script>

<MaterialAppMin theme={$theme}>
	<Snackbar class="{$snackbar?.color || 'red'} flex-column" center bottom bind:active={snackbarVisible} timeout={$snackbar?.timeout || 5000}>{$snackbar?.content}</Snackbar>

	<div class="flex flex-col min-h-screen justify-between">
		<AppBar class="grow-0">
			<span class="text-2xl" style="color: #b676c7; font-family: Consolas">shader</span><span class="text-2xl" style="color: #63b1dc; font-family: Consolas">LABS</span>
			<Icon
				class="ml-2"
				path="M5,19A1,1 0 0,0 6,20H18A1,1 0 0,0 19,19C19,18.79 18.93,18.59 18.82,18.43L13,8.35V4H11V8.35L5.18,18.43C5.07,18.59 5,18.79 5,19M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6M13,16L14.34,14.66L16.27,18H7.73L10.39,13.39L13,16M12.5,12A0.5,0.5 0 0,1 13,12.5A0.5,0.5 0 0,1 12.5,13A0.5,0.5 0 0,1 12,12.5A0.5,0.5 0 0,1 12.5,12Z"
			/>

			<div class="flex-grow" />

			<Button fab depressed on:click={() => ($theme = $theme === 'light' ? 'dark' : 'light')}>
				<Icon
					path={$theme === 'light'
						? 'M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z'
						: 'M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z'}
				/>
			</Button>
		</AppBar>

		<div class="w-full p-4 md:px-0 md:w-2/3 lg:w-1/2 mx-auto">
			<slot />
		</div>

		<Footer class="grow-0 text-center text-sm p-4">
			<div class="w-full">
				<p>Copyright &copy; 2021 - 2022, shaderLABS.</p>
				<p>Solely essential cookies are used, such as a session cookie to keep you logged in.</p>
				<p>The source code of this website is available on <a href="https://github.com/shaderLABS/shaderWEB">GitHub</a>.</p>
			</div>
		</Footer>
	</div>
</MaterialAppMin>
