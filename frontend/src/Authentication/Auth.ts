/** @format */

import axios from '../axios';
export const logout = async () => {
	const res = await axios.post(`/api/auth/logout`);
	const data = res.data;
	if (data.success) {
		window.sessionStorage.removeItem('authenticated');
		window.sessionStorage.removeItem('userAuthenticated');
	}
	return data;
};
