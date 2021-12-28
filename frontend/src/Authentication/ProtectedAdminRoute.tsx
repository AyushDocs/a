/** @format */

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthenticated from './useAuthenticated';
const ProtectedAdminRoute: React.FC<{ component: React.FC }> = ({ component: Child }) => {
	const isAuth = useAuthenticated();
	if (isAuth) return <Child />;
	return <Navigate to='/login' />;
};

export default ProtectedAdminRoute;
