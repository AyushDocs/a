import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';
import useInput from '../../../hooks/useInput';
import { useAppDispatch } from '../../../redux/reducerHooks';
import { setAll } from '../../../redux/slices/AlertSlice';
import { setUserAuthenticated } from '../../../redux/slices/UserIsAuthenticated';
import { signup } from './SignupLogic';
const Signup = () => {      
    const [email, emailBind, emailReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");
    const [confPassword, confPasswordBind, confPasswordReset] = useInput("");
    const [showAlert, setshowAlert] = useState(false)
    const [FailureMessage, setFailureMessage] = useState('Your network is bad')
    const [loading, setloading] = useState(false)
    const reset=()=>{emailReset();passwordReset();confPasswordReset()}
    const dispatch=useAppDispatch();
    const navigate=useNavigate()
    document.title="AlokMeds | Signup"
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(confPassword!==password){
            setshowAlert(true);
            return setFailureMessage('password and confirm password are not same');
        }
        setloading(true)
        if(!navigator.onLine)return setFailureMessage('Poor internet connection')
        try {
            const {success,errorMessage} = await signup(email, password);
            if(!success) return dispatch(setAll({color:'danger',message:errorMessage}))    
            dispatch(setAll({color:'success',message:'Successfully signed up user'}))      
            dispatch(setUserAuthenticated(true))
            setloading(false)
            navigate('/home')
        } catch (error) {
            dispatch(setAll({color:'danger',message:'Network issues'}))
            setloading(false)
        }        
    }
    return (
        <div className="container my-4">
        <Alert color='danger' isOpen={showAlert}>
         <div className="d-flex justify-content-between">
           <span className="alert-text">{FailureMessage}</span>
           <button className={`close btn btn-danger btn-sm`} data-dismiss="alert" aria-label="Close" onClick={()=>setshowAlert(false)}>
            <span aria-hidden="true">X</span>
           </button>
         </div>
       </Alert>
       {loading && <Spinner/>}
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" autoComplete="on"{...emailBind} className="form-control" id="email" required aria-describedby="emailHelp" />
                  <div id="emailHelp"className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" autoComplete="on" {...passwordBind} value={password} className="form-control" required id="password" />
              </div>
              <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                  <input type="password"autoComplete="on" {...confPasswordBind} value={confPassword}className="form-control" required id="confirm-password" />
              </div>
              
       <div className="d-flex justify-content-between my-3">
           <span>
           <button onClick={reset} className="btn btn-secondary mx-2">Reset</button>
           <button type="submit" className="btn btn-primary mx-2">Sign up</button>
           </span>
            <span className="text-primary">Already have an account?<Link to="/login" className="btn btn-danger mx-2">Log in</Link></span> 
       </div>
 
          </form>
      </div>)
}

export default Signup
