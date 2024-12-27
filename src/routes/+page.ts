import { requestData, type BanInformation, type UserInformation } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let user: UserInformation | null = null;
	let ban: Promise<BanInformation | null> = Promise.resolve(null);

	try {
		const userData = await requestData('/api/user/me', fetch);

		// 200 OK - user is logged in, data in response
		// 204 No Content - user not logged in, no data available
		if (userData.status === 200) {
			user = (await userData.json()) as UserInformation;

			if (user.isBanned) {
				ban = requestData('/api/ban/me', fetch).then((response) => {
					if (!response.ok) return null;
					return response.json();
				});
			}
		}
	} catch (error) {
		console.error(error);
	}

	return { user, ban };
};
