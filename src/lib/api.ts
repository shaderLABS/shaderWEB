import { snackbar } from './stores';

export type UserInformation = {
	id: string;
	username: string;
	discriminator: number;
	avatarURL: string;
	isBanned: boolean;
};

export type BanAppeal = {
	result: 'pending' | 'declined' | 'accepted';
	result_reason?: string;
	result_timestamp?: string;
	timestamp: string;
};

export type BanInformation = {
	id: string;
	moderator?: {
		id: string;
		username: string;
		discriminator: number;
	};
	appeal?: BanAppeal;
	reason: string;
	context_url: string;
	expire_timestamp: string;
	timestamp: string;
};

export function decodeError(code: string) {
	switch (code) {
		case '0':
			return 'Failed to fetch account information.';
		default:
			return 'An error occured while logging in.';
	}
}

export function formatTime(time: string) {
	return new Date(time).toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	});
}

export function fetchData(endpoint: string, fetchFunction: (input: RequestInfo, init?: RequestInit) => Promise<Response> = fetch) {
	return fetchFunction(import.meta.env.VITE_API_URL + endpoint, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
		credentials: 'include',
	});
}

export function logIn() {
	window.location.href = import.meta.env.VITE_API_URL + '/api/auth/login';
}

export async function logOut() {
	const { ok } = await fetch(import.meta.env.VITE_API_URL + '/api/auth/logout', {
		method: 'POST',
		credentials: 'include',
	});

	if (ok) window.location.reload();
	else snackbar.set({ content: 'Failed to log out.' });
}

export async function sendAppeal(reason: string): Promise<BanAppeal | undefined> {
	const { ok } = await fetch(import.meta.env.VITE_API_URL + '/api/appeal', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			reason,
		}),
		credentials: 'include',
	});

	if (ok) {
		snackbar.set({ content: 'Your ban appeal has been sent.', color: 'green' });
		return {
			result: 'pending',
			timestamp: new Date().toISOString(),
		};
	} else {
		snackbar.set({ content: 'Failed to send your ban appeal.' });
	}
}
