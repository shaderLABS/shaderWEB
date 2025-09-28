import { toast } from 'svelte-sonner';

export type UserInformation = {
	id: string;
	username: string;
	avatarURL: string;
	isBanned: boolean;
};

export type BanAppeal = {
	result: 'pending' | 'declined' | 'accepted' | 'expired';
	resultReason?: string;
	resultTimestamp?: string;
	timestamp: string;
};

export type BanInformation = {
	id: string;
	appeal?: BanAppeal;
	appealCooldown: number;
	reason: string;
	contextURL?: string;
	expireTimestamp?: string;
	timestamp: string;
};

function decodeErrorCode(code: string) {
	switch (code) {
		case '0':
			return 'Failed to fetch account information.';
		default:
			return 'An error occured while logging in.';
	}
}

export function displayErrorCode(code: string) {
	toast.error('Authentication Error', {
		description: decodeErrorCode(code),
		duration: Number.POSITIVE_INFINITY
	});
}

export function formatTime(time: string | number) {
	return new Date(time).toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23'
	});
}

export function requestData(
	endpoint: string,
	fetchFunction: (input: RequestInfo, init?: RequestInit) => Promise<Response> = fetch
) {
	return fetchFunction(import.meta.env.VITE_API_URL + endpoint, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		},
		credentials: 'include'
	});
}

export function logIn() {
	window.location.href = import.meta.env.VITE_API_URL + '/api/auth/login';
}

export async function logOut() {
	const { ok } = await fetch(import.meta.env.VITE_API_URL + '/api/auth/logout', {
		method: 'POST',
		credentials: 'include'
	});

	if (ok) window.location.reload();
	else
		toast.error('Authentication Error', {
			description: 'Failed to log out.',
			duration: Number.POSITIVE_INFINITY
		});
}

export async function sendAppeal(reason: string): Promise<BanAppeal | undefined> {
	const { ok } = await fetch(import.meta.env.VITE_API_URL + '/api/appeal', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			reason
		}),
		credentials: 'include'
	});

	if (ok) {
		toast.success('Success', { description: 'Your ban appeal has been sent.' });
		return {
			result: 'pending',
			timestamp: new Date().toISOString()
		};
	} else {
		toast.error('Server Error', {
			description: 'Failed to send your ban appeal.',
			duration: Number.POSITIVE_INFINITY
		});
	}
}
