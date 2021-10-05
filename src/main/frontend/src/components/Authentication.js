import { React, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import auth from '../auth';
import Alert from './Alert';
export default function Auth(props) {
    const {Offset}=useParams()
    const [Failure, setFailure] = useState(null)
    if(auth.isAuthenticated())return <Redirect to={{pathname:`/admin/${Offset}`}}/>
    const login=e=>{
      e.preventDefault();
      const email =document.getElementById('auth__email').value
      const password =document.getElementById('auth__password').value
      auth.login(email,password,hasErr=>auth.isAuthenticated()||!hasErr?setFailure(false):setFailure(true))
    }
    
    return (<>
    {Failure && <Alert text={`Please enter correct credentials`} colour="danger" />}
    <div className="container my-2 form-container">
      
    <form onSubmit={login}>
      <div>
        <label className="form-label" htmlFor="auth__email">Please enter your email</label>
        <input  className="form-control my-3" id="auth__email" required type="email"/>
        <label className="form-label" htmlFor="auth__password">Please enter your Password</label>
        <input autoComplete='on' id="auth__password" required type="password" className="form-control"/>
      </div>
      <div className="container">
        <button className="btn btn-success btn-outline-light my-2" type="submit">{props.type}</button>
      </div>
    </form>
    </div>
    </>)
}
