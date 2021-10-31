import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { login } from '../Auth';
import useInput from '../hooks/useInput';
const Login = () => {
    const [email, emailBind, emailReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");
    const [name, nameBind, nameReset] = useInput("");
    const [showAlert, setshowAlert] = useState(false)
    const [Stage, setStage] = useState({curr:'nothing'})
    const reset=()=>{emailReset();nameReset();passwordReset();}
    const handleSubmit=e=>{
        e.preventDefault();
        if(email=='' && name==''){
            setshowAlert(true)
            setStage({curr:"danger"})
        }
        login(email,password,name)

    }
    return (
     <div className="container my-4">
       <Alert color={Stage.curr} isOpen={ showAlert }>
        <div className="d-flex justify-content-between">
          <span className="alert-text">{Stage.curr==='success'?`Successfully Logged In`:''}{Stage.curr==='danger'?`Log In failed`:''}</span>
          <button className={`close btn btn-${Stage.curr} btn-sm`} data-dismiss="alert" aria-label="Close" onClick={()=>setshowAlert(false)}>
           <span aria-hidden="true">X</span>
          </button>
        </div>
      </Alert>
         <form onSubmit={handleSubmit}>
        <h4 className="my-4">Enter name or email</h4>
             <div className="mb-3 form-container">
                 <label htmlFor="name" className="form-label">Name</label>
                 <input {...nameBind} value={name} className="form-control" id="name" name="name" />
             </div>
             <div className="mb-3">
                 <label htmlFor="email" className="form-label">Email address</label>
                 <input type="email" value={email} {...emailBind} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
             </div>
             <div className="mb-3">
                 <label htmlFor="password" className="form-label">Password</label>
                 <input type="password" {...passwordBind} value={password} className="form-control" required name="password" id="password" />
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
