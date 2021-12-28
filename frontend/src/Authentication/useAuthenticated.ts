import { useRef } from 'react';
import { useAppSelector } from '../redux/reducerHooks';

export const isAuthenticatedInSessionStorage = window.sessionStorage.getItem('authenticated') === 'true'|| window.sessionStorage.getItem('userAuthenticated') === 'true'
const useAuthenticated = () => {
    const ref = useRef(false)
    const isUserAuthenticatedInRedux=useAppSelector(state=>state.IsUserAuthenticated.isAuth)
    const isAdminAuthenticatedInRedux = useAppSelector(state => state.IsAdminAuthenticated.isAuth) 
    ref.current=isUserAuthenticatedInRedux||isAdminAuthenticatedInRedux||isAuthenticatedInSessionStorage;
    return ref.current
}

export default useAuthenticated
