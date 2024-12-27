<script lang="ts">
	import { logIn } from '$lib/api';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import LogIn from 'lucide-svelte/icons/log-in';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Login with Discord</Card.Title>
	</Card.Header>

	<Card.Content>
		<Card.Description class="text-justify">
			In order to write a ban appeal or view information about your ban status, you need to log in
			with Discord.
		</Card.Description>
	</Card.Content>

	<hr />

	<Card.Content>
		<Card.Description class="text-justify">
			We do not store any personally identifiable information (PII). After logging in, Discord
			provides us with general information about your account such as your User ID, which is used
			for retrieving information about your ban status and sent back to Discord whenever you submit
			a ban appeal.
		</Card.Description>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" onclick={logIn}>
			<LogIn />
			LOG IN
		</Button>
	</Card.Footer>
</Card.Root>
