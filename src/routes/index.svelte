<script context="module" lang="ts">
	export async function load({ fetch }) {
		const data = await fetchData('/api/user/me', fetch);

		// 200 OK - user is logged in, data in response
		// 204 No Content - user not logged in, no data available
		if (data.status == 200) {
			return { props: { user: await data.json() } };
		}

		return { props: { user: undefined } };
	}
</script>

<script lang="ts">
	import { BanInformation, fetchData, formatTime, logIn, logOut, sendAppeal, UserInformation } from '$lib/api';
	import {
		Alert,
		Avatar,
		Button,
		Card,
		CardActions,
		CardSubtitle,
		CardText,
		CardTitle,
		DataTable,
		DataTableBody,
		DataTableCell,
		DataTableRow,
		Divider,
		Icon,
		ProgressLinear,
		Textarea,
	} from 'svelte-materialify/src';
	import { slide } from 'svelte/transition';

	export let user: UserInformation;

	let appealReason: string = '';
	let ban: BanInformation;

	if (user?.isBanned) {
		fetchData('/api/ban/me')
			.then((raw) => raw.json())
			.then((data) => (ban = data));
	}
</script>

{#if !user}
	<Card hover>
		<CardTitle class="pb-0">Login with Discord</CardTitle>
		<CardText>In order to write a ban appeal or view information about your ban status, you need to log in with Discord.</CardText>
		<Divider class="mx-4" />
		<CardText>
			We do not store any personally identifiable information (PII). After logging in, Discord provides us with general information about your account such as your User ID, which is used for
			retrieving information about your ban status and sent back to Discord whenever you submit a ban appeal.
		</CardText>
		<CardActions>
			<Button block on:click={logIn}>LOG IN</Button>
		</CardActions>
	</Card>
{:else}
	<Card hover>
		<div class="flex justify-center items-center p-4">
			<Avatar class="w-24 h-24">
				<img width="96" height="96" src={user.avatarURL} alt="avatar" />
			</Avatar>
			<div>
				<CardTitle>{user.username}#{user.discriminator}</CardTitle>
				<CardSubtitle>{user.id}</CardSubtitle>
			</div>
		</div>
		<CardActions>
			<Button block on:click={logOut}>LOG OUT</Button>
		</CardActions>
	</Card>

	<Card hover class="mt-4">
		<CardTitle>Ban Status</CardTitle>
		<CardSubtitle>{user.isBanned ? 'You are banned from shaderLABS.' : 'You are not banned from shaderLABS.'}</CardSubtitle>

		{#if user.isBanned}
			{#if !ban}
				<ProgressLinear indeterminate />
			{:else}
				<div transition:slide>
					<CardText class="overflow-auto">
						<DataTable class="min-w-full flex-col">
							<DataTableBody>
								<DataTableRow>
									<DataTableCell><b>ID</b></DataTableCell>
									<DataTableCell><pre class="whitespace-normal">{ban.id}</pre></DataTableCell>
								</DataTableRow>
								<DataTableRow>
									<DataTableCell><b>Moderator</b></DataTableCell>
									<DataTableCell>{ban.moderator ? `${ban.moderator.username}#${ban.moderator.discriminator} (${ban.moderator.id})` : 'System'}</DataTableCell>
								</DataTableRow>
								<DataTableRow>
									<DataTableCell><b>Reason</b></DataTableCell>
									<DataTableCell>{ban.reason}</DataTableCell>
								</DataTableRow>
								<DataTableRow>
									<DataTableCell><b>Context</b></DataTableCell>
									<DataTableCell>{ban.context_url || 'No context exists.'}</DataTableCell>
								</DataTableRow>
								<DataTableRow>
									<DataTableCell><b>Expiring At</b></DataTableCell>
									<DataTableCell>{ban.expire_timestamp ? formatTime(ban.expire_timestamp) : 'Permanent'}</DataTableCell>
								</DataTableRow>
								<DataTableRow>
									<DataTableCell><b>Created At</b></DataTableCell>
									<DataTableCell>{formatTime(ban.timestamp)}</DataTableCell>
								</DataTableRow>
							</DataTableBody>
						</DataTable>
					</CardText>
				</div>
			{/if}
		{/if}
	</Card>

	{#if user.isBanned}
		<Card hover class="mt-4">
			<CardTitle>Ban Appeal</CardTitle>
			{#if !ban}
				<ProgressLinear indeterminate />
			{:else}
				<div transition:slide>
					{#if ban.appeal?.result === 'pending'}
						<CardText class="pt-0">
							<Alert class="primary-color m-0">
								<div slot="icon">
									<Icon
										path="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
									/>
								</div>
								The ban appeal you sent on {formatTime(ban.appeal.timestamp)} is currently pending. Please wait until a staff member reviews it.
							</Alert>
						</CardText>
					{:else}
						{#if ban.appeal?.result === 'declined'}
							<CardText class="pt-0">
								<Alert class="error-color m-0">
									<div slot="icon">
										<Icon
											path="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
										/>
									</div>
									<p>The ban appeal you sent on {formatTime(ban.appeal.timestamp)} has been declined.</p>
									<p class="text-xs pt-2">{formatTime(ban.appeal.result_timestamp)}</p>
								</Alert>
								{#if ban.appeal.result_reason}
									<div class="text-justify mt-4">{ban.appeal.result_reason}</div>
								{/if}
							</CardText>
							<Divider class="pb-4" />
						{/if}
						<CardText class="pt-0">
							<Textarea bind:value={appealReason} counter={2000} solo flat autogrow placeholder="Enter reasons why we should unban you..." />
						</CardText>
						<CardActions>
							<Button block disabled={appealReason.trim().length == 0 || appealReason.length > 2000} on:click={async () => (ban.appeal = await sendAppeal(appealReason))}>SEND</Button>
						</CardActions>
					{/if}
				</div>
			{/if}
		</Card>
	{/if}
{/if}

<style>
	:global(.s-text-field__wrapper.outlined),
	:global(.s-text-field__wrapper.solo),
	:global(.s-text-field__wrapper.filled) {
		padding: 0;
	}

	:global(.s-textarea .s-text-field__wrapper.solo textarea) {
		margin: 0;
	}
</style>
