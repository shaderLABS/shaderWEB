<script lang="ts">
	import { formatTime, sendAppeal, type BanAppeal } from '$lib/api';
	import * as Alert from '$lib/components/ui/alert/index';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Ban from '@lucide/svelte/icons/ban';
	import Clock from '@lucide/svelte/icons/clock';
	import Hourglass from '@lucide/svelte/icons/hourglass';
	import Send from '@lucide/svelte/icons/send';

	let { appeal, appealCooldown }: { appeal: BanAppeal | undefined; appealCooldown: number } =
		$props();

	function isPending(appeal: BanAppeal): appeal is BanAppeal & { result: 'pending' } {
		return appeal.result === 'pending';
	}

	function isDeclined(
		appeal: BanAppeal
	): appeal is BanAppeal & { result: 'declined' } & Required<Pick<BanAppeal, 'resultTimestamp'>> {
		return appeal.result === 'declined';
	}

	function hasCooldown(
		appeal: BanAppeal,
		cooldown: number
	): appeal is BanAppeal & { result: 'declined' } & Required<Pick<BanAppeal, 'resultTimestamp'>> {
		return (
			isDeclined(appeal) &&
			new Date(appeal.resultTimestamp).getTime() + cooldown * 1000 > Date.now()
		);
	}

	let appealReason: string = $state('');
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Ban Appeal</Card.Title>
	</Card.Header>

	{#if appeal && isPending(appeal)}
		<Card.Content>
			<Alert.Root>
				<Clock class="size-4" />

				<Alert.Title>Pending</Alert.Title>
				<Alert.Description>
					The ban appeal you sent on <span class="font-medium">{formatTime(appeal.timestamp)}</span>
					is currently pending. Please wait until a staff member reviews it.
				</Alert.Description>
			</Alert.Root>
		</Card.Content>
	{:else}
		{#if appeal && isDeclined(appeal)}
			<Card.Content>
				<Alert.Root>
					<Ban class="size-4" />

					<Alert.Title>Declined</Alert.Title>
					<Alert.Description>
						<p>
							The ban appeal you sent on <span class="font-medium"
								>{formatTime(appeal.timestamp)}</span
							> has been declined.
						</p>

						{#if appeal.resultReason}
							<blockquote class="mt-4 border-l-2 pl-6 italic whitespace-pre-wrap text-justify">
								{appeal.resultReason}
							</blockquote>
						{/if}

						<p class="mt-4 text-muted-foreground">{formatTime(appeal.resultTimestamp)}</p>
					</Alert.Description>
				</Alert.Root>
			</Card.Content>

			<hr />
		{/if}

		{#if appeal && hasCooldown(appeal, appealCooldown)}
			<Card.Content>
				<Alert.Root>
					<Hourglass class="size-4" />

					<Alert.Title>Cooldown</Alert.Title>
					<Alert.Description>
						You can submit another ban appeal after <span class="font-medium"
							>{formatTime(
								new Date(appeal.resultTimestamp).getTime() + appealCooldown * 1000
							)}</span
						>.
					</Alert.Description>
				</Alert.Root>
			</Card.Content>
		{:else}
			<Card.Content>
				<Textarea
					class="field-sizing-content"
					placeholder="Enter reasons why we should unban you..."
					bind:value={appealReason}
				/>
			</Card.Content>

			<Card.Footer>
				<Button
					class="w-full"
					disabled={appealReason.trim().length === 0 || appealReason.length > 2000}
					onclick={async () => (appeal = await sendAppeal(appealReason))}
				>
					<div class="flex-1 flex"></div>

					<div class="flex items-center justify-center gap-2">
						<Send />
						SEND
					</div>

					<div class="flex-1 flex justify-end">
						<Badge variant="secondary">
							{appealReason.length} / 2000
						</Badge>
					</div>
				</Button>
			</Card.Footer>
		{/if}
	{/if}
</Card.Root>
