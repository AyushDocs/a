import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/reducerHooks';
export default function ProtectedRoute(props:React.PropsWithChildren<any>) {
    const IsAuthenticated = useAppSelector(state => state.IsAdminAuthenticated.isAuth)||sessionStorage.getItem('isAuthenticated');
    if (IsAuthenticated || window.sessionStorage.getItem('authenticated'))
        return <props.componentToRender/>
    else return <Navigate to="/admin/login"/>;
}
