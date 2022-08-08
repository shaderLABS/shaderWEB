<script context="module" lang="ts">
	import { fetchData, formatTime, logIn, logOut, sendAppeal, type BanInformation, type UserInformation } from '$lib/api';
	import type { Load } from '@sveltejs/kit';
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

	export const load: Load = async ({ fetch }) => {
		const data = await fetchData('/api/user/me', fetch);

		// 200 OK - user is logged in, data in response
		// 204 No Content - user not logged in, no data available
		if (data.status == 200) {
			return { props: { user: await data.json() } };
		}

		return { props: { user: undefined } };
	};
</script>

<script lang="ts">
	export let user: UserInformation;

	let appealReason: string = '';
	let ban: BanInformation;

	if (user?.isBanned) {
		fetchData('/api/ban/me')
			.then((raw) => {
				if (raw.ok) return raw.json().catch(() => undefined);
			})
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
									<DataTableCell>
										{#if ban.contextURL}
											<a href={ban.contextURL} target="_blank">click here</a>
										{:else}
											No context exists.
										{/if}
									</DataTableCell>
								</DataTableRow>
								<DataTableRow>
									<DataTableCell><b>Expiring At</b></DataTableCell>
									<DataTableCell>{ban.expireTimestamp ? formatTime(ban.expireTimestamp) : 'Permanent'}</DataTableCell>
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
						{#if ban.appeal?.result === 'declined' && ban.appeal.resultTimestamp}
							<CardText class="pt-0">
								<Alert class="error-color m-0">
									<div slot="icon">
										<Icon
											path="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
										/>
									</div>
									<p>The ban appeal you sent on {formatTime(ban.appeal.timestamp)} has been declined.</p>
									<p class="text-xs pt-2">{formatTime(ban.appeal.resultTimestamp)}</p>
								</Alert>
								{#if ban.appeal.resultReason}
									<div class="text-justify mt-4">{ban.appeal.resultReason}</div>
								{/if}
							</CardText>
							<Divider class="pb-4" />
						{/if}
						{#if ban.appeal?.result === 'declined' && ban.appeal.resultTimestamp && new Date(ban.appeal.resultTimestamp).getTime() + ban.appealCooldown * 1000 > Date.now()}
							<CardText class="pt-0">
								<Alert class="m-0 text-center" outlined text>
									<p>You can submit another ban appeal on {formatTime(new Date(ban.appeal.resultTimestamp).getTime() + ban.appealCooldown * 1000)}.</p>
								</Alert>
							</CardText>
						{:else}
							<CardText class="pt-0">
								<Textarea bind:value={appealReason} counter={2000} solo flat autogrow placeholder="Enter reasons why we should unban you..." />
							</CardText>
							<CardActions>
								<Button block disabled={appealReason.trim().length == 0 || appealReason.length > 2000} on:click={async () => (ban.appeal = await sendAppeal(appealReason))}>SEND</Button>
							</CardActions>
						{/if}
					{/if}
				</div>
			{/if}
		</Card>
	{/if}
{/if}

<style global>
	.s-text-field__wrapper.outlined,
	.s-text-field__wrapper.solo,
	.s-text-field__wrapper.filled {
		padding: 0;
	}

	.s-textarea .s-text-field__wrapper.solo textarea {
		margin: 0;
	}
</style>
