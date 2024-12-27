<script lang="ts">
	import AppealCard from '$lib/components/appeal-card.svelte';
	import BanCard from '$lib/components/ban-card.svelte';
	import LoginCard from '$lib/components/login-card.svelte';
	import LogoutCard from '$lib/components/logout-card.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { slide } from 'svelte/transition';

	let { data } = $props();
	let { user, ban } = data;
</script>

{#if !user}
	<LoginCard />
{:else}
	<LogoutCard {user} />

	<div class="my-4"></div>

	{#await ban}
		<div transition:slide>
			<LoaderCircle class="size-12 animate-spin mx-auto" />
		</div>
	{:then ban}
		<div transition:slide>
			<BanCard {ban} />

			{#if ban}
				<div class="my-4"></div>

				<AppealCard appeal={ban.appeal} appealCooldown={ban.appealCooldown} />
			{/if}
		</div>
	{/await}
{/if}
