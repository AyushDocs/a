/** @format */

import axios from '../../../axios';
import AuthResponse from '../../../Types/AuthResponse';

export const login = async (email:string, password:string)=> {
	const body = { password, email };
	const res = await axios.post('/api/auth/login', body, {});
	const data = res.data;
	interactWithLocalStorage(data,email,password)
	return data;
};
const interactWithLocalStorage=(data:AuthResponse,email:string,password:string)=>{
	if (!data.success)return;
	//temporarily set user as authenticated
	window.sessionStorage.setItem(data.role === 'ADMIN' ? 'authenticated' : 'userAuthenticated', 'true');
	//and make  sure to remove it in 15 minutes
	const timeoutId= setTimeout(() => sessionStorage.removeItem(data.role === 'ADMIN' ? 'authenticated' : 'userAuthenticated'), 1000 * 60 * 15);
	//but if login happens faster then remove that timeout
	setTimeout(async () => {
		const data = await login(email, password);
		if (!data.success) clearTimeout(timeoutId);
		interactWithLocalStorage(data,email,password)
	}, 10 * 60 * 1000);
}
