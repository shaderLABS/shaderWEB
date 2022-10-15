import { fetchData } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const data = await fetchData('/api/user/me', fetch);

	// 200 OK - user is logged in, data in response
	// 204 No Content - user not logged in, no data available
	if (data.status === 200) {
		return { user: await data.json() };
	}

	return { user: undefined };
};
