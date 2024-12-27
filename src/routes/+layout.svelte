<script lang="ts">
	import { page } from '$app/state';
	import { displayErrorCode } from '$lib/api';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index';
	import { dark } from '$lib/stores';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		const errorCode = page.url.searchParams.get('error');
		if (errorCode) displayErrorCode(errorCode);
	});
</script>

<Toaster position="bottom-center" richColors closeButton theme={$dark ? 'dark' : 'light'} />

<div class="flex flex-col justify-between min-h-screen">
	<header class="w-full grow-0 border-b">
		<div class="w-full flex justify-between items-center p-4">
			<div>
				<span class="text-3xl" style="color: #b676c7; font-family: Consolas, Inconsolata, monospace"
					>shader</span
				><span
					class="text-3xl"
					style="color: #63b1dc; font-family: Consolas, Inconsolata, monospace">LABS</span
				>
			</div>

			<Button
				size="icon"
				variant="ghost"
				aria-label="Toggle Theme"
				onclick={() => ($dark = !$dark)}
			>
				{#if $dark}
					<Moon />
				{:else}
					<Sun />
				{/if}
			</Button>
		</div>
	</header>

	<div class="w-full p-4 md:px-0 md:w-2/3 lg:w-1/2 mx-auto">
		{@render children()}
	</div>

	<footer class="w-full grow-0 p-4 border-t">
		<div class="text-muted-foreground text-center text-sm">
			<p>Copyright &copy; {new Date().getFullYear()}, shaderLABS.</p>
			<p>Solely essential cookies are used, such as a session cookie to keep you logged in.</p>
			<p>
				The source code of this website is available on <a
					href="https://github.com/shaderLABS/shaderWEB"
					class="font-medium underline underline-offset-4">GitHub</a
				>.
			</p>
		</div>
	</footer>
</div>
