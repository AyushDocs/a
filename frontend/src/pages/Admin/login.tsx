import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "reactstrap";
import { adminLogin } from "../../Authentication/Auth";
import useInput from "../../hooks/useInput";
import { useAppDispatch } from "../../redux/reducerHooks";
import { setAdminAuthenticated } from "../../redux/slices/AdminIsAuthenticated";
import { setAll } from "../../redux/slices/AlertSlice";
const AdminLogin = () => {      
  const [email, emailBind, emailReset] = useInput("");
  const [password, passwordBind, passwordReset] = useInput("");
  const [confPassword, confPasswordBind, confPasswordReset] = useInput("");
  const [showAlert, setshowAlert] = useState(false)
  const [Stage, setStage] = useState({curr:'nothing'})
  const [loading, setloading] = useState(false)
  const [FailureMessage, setFailureMessage] = useState('Your network is bad')
  const dispatch=useAppDispatch();
  const reset=()=>{emailReset();passwordReset();confPasswordReset()}
  const navigate =useNavigate()
  const handleSubmit=(e:React.FormEvent)=>{
      e.preventDefault();
     
      setloading(true)
      if(password!==confPassword){
          setshowAlert(true)
          setStage({curr:'danger'})
          setloading(false)
          setFailureMessage('Your entered password and confirm password are not same')
          return
      }
      adminLogin(email, password)
    .then(({success,errorMessage}) =>{
      if(!success){
       return dispatch(setAll({message:errorMessage,Stage:'danger'}))
      }
      window.sessionStorage.setItem('authenticated','true')
      dispatch(setAll({message:'You have authenticated successfully Dr Alok',Stage:'success'}))
      dispatch(setAdminAuthenticated(success))
      setloading(false);
      setTimeout(()=>window.sessionStorage.removeItem('authenticated'),5*60*60)  
      setloading(false)
      navigate('/home')
    })
    .catch(() =>{ setStage({curr:'danger'});setFailureMessage('weak internet');setloading(false)})
  }
  return (
  <div className="container my-4">
    <Alert color={Stage.curr} isOpen={ showAlert }>
      <div className="d-flex justify-content-between">
        <span className="alert-text">{Stage.curr==='success'?`Successfully Logged In`:''}{Stage.curr==='danger'?FailureMessage:''}</span>
        <button className={`close btn btn-${Stage.curr} btn-sm`} data-dismiss="alert" aria-label="Close" onClick={()=>setshowAlert(false)}>
         <span aria-hidden="true">X</span>
        </button>
      </div>
    </Alert>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input autoComplete="on" type="email" value={email} {...emailBind} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input autoComplete="on" type="password" {...passwordBind} value={password} className="form-control" required name="password" id="password" />
      </div>
      <div className="mb-3">
           <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
           <input autoComplete="on" type="password"{...confPasswordBind} value={confPassword}className="form-control" required id="confirm-password" />
       </div>
       <button onClick={reset} className="btn btn-secondary mx-2">Reset</button>
       <button type="submit" className="btn btn-primary mx-2">Log in</button>
       {loading && <Spinner />}  
    </form>
  </div>)
}
export default AdminLogin 