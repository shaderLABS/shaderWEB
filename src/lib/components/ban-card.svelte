<script lang="ts">
	import { formatTime, type BanInformation } from '$lib/api';
	import * as Card from '$lib/components/ui/card/index';
	import * as Table from '$lib/components/ui/table/index';

	let { ban }: { ban: BanInformation | null } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Ban Status</Card.Title>
	</Card.Header>

	<Card.Content>
		<Card.Description>
			You are {ban ? 'banned' : 'not banned'} from shaderLABS.
		</Card.Description>
	</Card.Content>

	{#if ban}
		<hr />

		<Card.Content>
			<Table.Root>
				<Table.Body>
					<Table.Row>
						<Table.Head>Moderator</Table.Head>
						<Table.Cell>
							{ban.moderator ? `${ban.moderator.username} (${ban.moderator.id})` : 'System'}
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Head>Reason</Table.Head>
						<Table.Cell>{ban.reason}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Head>Created At</Table.Head>
						<Table.Cell>{formatTime(ban.timestamp)}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Head>Expiring At</Table.Head>
						<Table.Cell>
							{ban.expireTimestamp ? formatTime(ban.expireTimestamp) : 'Permanent'}
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</Card.Content>
	{/if}
</Card.Root>
