/** @format */

import { AuthResponse } from '../../../models/AuthResponse';
import { User } from '../../../models/User';
import { login } from '../Login/LoginLogic';

export const signup = async (email: string, password: string) => {
	const body: User = { password, email };
	const options: RequestInit = { body: JSON.stringify(body), method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include' };
	const res: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/signup`, options);
	const data: AuthResponse = await res.json();
	window.sessionStorage.setItem('userAuthenticated', 'true');
	const timeoutId: NodeJS.Timeout = setTimeout(() => sessionStorage.removeItem(data.role === 'ADMIN' ? 'authenticated' : 'userAuthenticated'), 1000 * 60 * 15);
	setTimeout(async () => {
		const { success } = await login(email, password);
		if (success) clearTimeout(timeoutId);
	}, 12 * 60 * 1000);
	return data;
};
