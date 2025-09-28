<script lang="ts">
	import type { UserInformation } from '$lib/api';
	import { logOut } from '$lib/api';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import LogOut from '@lucide/svelte/icons/log-out';

	let { user }: { user: UserInformation } = $props();
</script>

<Card.Root>
	<Card.Content class="flex flex-wrap gap-4 items-center justify-center">
		<div class="flex-1">
			<Card.Title>{user.username}</Card.Title>
			<Card.Description>{user.id}</Card.Description>
		</div>

		<Avatar.Root class="size-16">
			<Avatar.Image src={user.avatarURL} alt="avatar" />
			<Avatar.Fallback>{user.username.substring(0, 2)}</Avatar.Fallback>
		</Avatar.Root>
	</Card.Content>

	<Card.Footer>
		<Button class="w-full" onclick={logOut}>
			<LogOut />
			LOG OUT
		</Button>
	</Card.Footer>
</Card.Root>
