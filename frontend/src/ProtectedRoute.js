import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Authentication from './components/Authentication';
import { toggle } from './slices/authModal';
export default function ProtectedRoute({component:Component,...rest}) {
    const [IsAuthenticated, setIsAuthenticated] = useState(false)
    const checkForAuth = useSelector(state =>state.checkForAuth.value)
    const dispatch = useDispatch()
    const toggleLogin =() => dispatch(toggle());
    useEffect(()=>{
      setIsAuthenticated(checkForAuth)
    },[checkForAuth])
    return (
        <Route {...rest} render={props=>{
            if(IsAuthenticated)return <Component {...props} />
            else{
                toggleLogin()
                return <Authentication/>
            }
        }}/>
    )
}
