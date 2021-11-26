import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';
import { login } from '../Authentication/Auth';
import useInput from '../hooks/useInput';
import { useAppDispatch } from '../redux/reducerHooks';
import { setAll } from '../redux/slices/AlertSlice';
import { setUserAuthenticated } from '../redux/slices/UserIsAuthenticated';
const Login = () => {      
    const [email, emailBind, emailReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");
    const [confPassword, confPasswordBind, confPasswordReset] = useInput("");
    const [showAlert, setshowAlert] = useState(false)
    const [loading, setloading] = useState(false)
    const dispatch=useAppDispatch();
    const navigate=useNavigate()
    const reset=()=>{emailReset();passwordReset();confPasswordReset()}

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(password!==confPassword)return setshowAlert(true)
        setloading(true)
        try {
            const {success,errorMessage} =await login(email,password);
            if(!success) dispatch(setAll({Stage:'danger',message:errorMessage}))
            window.sessionStorage.setItem('userAuthenticated','true')
            dispatch(setUserAuthenticated(true))
            setTimeout(()=>sessionStorage.removeItem('userAuthenticated'),1000*60*15)
            dispatch(setAll({Stage:'success',message:'Logged in successfully'}))
            navigate('/home')
        } catch (error) {
            dispatch(setAll({Stage:'danger',message:'weak net'}))
            console.log(error);
        }
        finally{
            setloading(false)
        }
    }
    return (
     <div className="container my-4">
       <Alert color='danger' isOpen={ showAlert }>
        <div className="d-flex justify-content-between">
          <span className="alert-text">Password and confirm password are not equal</span>
          <button className={`close btn btn-danger btn-sm`} data-dismiss="alert" aria-label="Close" onClick={()=>setshowAlert(false)}>
           <span aria-hidden="true">X</span>
          </button>
        </div>
      </Alert>
      {loading && <Spinner />}
         <form onSubmit={handleSubmit}>
             <div className="mb-3">
                 <label htmlFor="email" className="form-label">Email address</label>
                 <input autoComplete="on"  type="email" value={email} {...emailBind} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
             </div>
             <div className="mb-3">
                 <label htmlFor="password" className="form-label">Password</label>
                 <input autoComplete="on" type="password" {...passwordBind} value={password} className="form-control" required name="password" id="password" />
             </div>
             <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                  <input autoComplete="on" type="password"{...confPasswordBind} value={confPassword}className="form-control" required id="confirm-password" />
              </div>
             
      <div className="d-flex justify-content-between my-3">
          <span>
          <button onClick={reset} className="btn btn-secondary mx-2">Reset</button>
          <button type="submit" className="btn btn-primary mx-2">Log in</button>
          </span>
           <span className="text-primary">Not yet Signed Up?<Link to="/signup" className="btn btn-danger mx-2">Sign up</Link></span> 
      </div>

         </form>
     </div>
    )
}
export default Login
