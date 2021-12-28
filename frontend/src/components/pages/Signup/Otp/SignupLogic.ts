/** @format */

import axios from '../../../../axios';
import { login } from '../../Login/LoginLogic';

export const signup = async (email:string, otp:string,password:string)=> {
	const body = { otp, email };
	const res = await axios.post('/api/auth/signup', body);
	const data=res.data;
	window.sessionStorage.setItem('userAuthenticated', 'true');
	const timeoutId = setTimeout(() => sessionStorage.removeItem(data.role === 'ADMIN' ? 'authenticated' : 'userAuthenticated'), 1000 * 60 * 15);
	setTimeout(async () => {
		const { success } = await login(email, password);
		if (success) clearTimeout(timeoutId);
	}, 12 * 60 * 1000);
	return data;
};
