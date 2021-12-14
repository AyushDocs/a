/** @format */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/reducerHooks';
interface Props {
	component: React.FC;
}
const ProtectedAdminRoute: React.FC<Props> = ({ component: Child }) => {
	const IsAuthenticated = useAppSelector(state => state.IsAdminAuthenticated.isAuth) || sessionStorage.getItem('isAuthenticated');
	if (IsAuthenticated || window.sessionStorage.getItem('authenticated')) return <Child />;
	else return <Navigate to='/login' />;
};

export default ProtectedAdminRoute;
