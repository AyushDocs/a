/** @format */

interface ApiResponse {
	success: boolean;
	errorMessage: string;
}
export const logout = async (): Promise<ApiResponse> => {
	const options: RequestInit = { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' } };
	const res: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/logout`, options);
	const data: ApiResponse = await res.json();
	if (data.success) {
		window.sessionStorage.removeItem('authenticated');
		window.sessionStorage.removeItem('userAuthenticated');
	}
	return data;
};
export const isAuthenticated = (): boolean => {
	const isAdminAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
	const isUserAuthenticated = window.sessionStorage.getItem('userAuthenticated') === 'true';
	return isAdminAuthenticated || isUserAuthenticated;
};
