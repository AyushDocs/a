/** @format */

import { AuthResponse } from '../../../models/AuthResponse';
import { User } from '../../../models/User';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
	const body: User = { password, email };
	const options: RequestInit = {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	};
	const res: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, options);
	const data: AuthResponse = await res.json();

	if (data.success) {
		//temporarily set user as authenticated
		window.sessionStorage.setItem(data.role === 'ADMIN' ? 'authenticated' : 'userAuthenticated', 'true');
		//and make  sure to remove it in 15 minutes
		const timeoutId: NodeJS.Timeout = setTimeout(() => sessionStorage.removeItem(data.role === 'ADMIN' ? 'authenticated' : 'userAuthenticated'), 1000 * 60 * 15);
		//but if login happens faster then remove that timeout
		setTimeout(async () => {
			const { success } = await login(email, password);
			if (success) clearTimeout(timeoutId);
		}, 12 * 60 * 1000);
	}
	return data;
};
