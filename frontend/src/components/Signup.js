import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { signup } from '../Auth';
import useInput from '../hooks/useInput';
const Signup = () => {
    const [email, emailBind, emailReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");
    const [name, nameBind, nameReset] = useInput("");
    const [showAlert, setshowAlert] = useState(false)
    const [Stage, setStage] = useState({curr:'nothing'})
    const reset=()=>{emailReset();nameReset();passwordReset();}
    const handleSubmit=e=>{
        e.preventDefault();
        signup(email,password)
        .then(res=>{
            if(res){
                setshowAlert(true)
                setStage({curr:"success"})
                reset()
            }
            else{
                setshowAlert(true)
                setStage({curr:"danger"})
            }
        })
        setshowAlert(true)
        setStage({curr:"danger"})
        reset()
    }
    return (
        <div className="container my-4">
        <Alert color={Stage.curr} isOpen={ showAlert }>
         <div className="d-flex justify-content-between">
           <span className="alert-text">{Stage.curr==='success'?`Successfully Signed Up`:''}{Stage.curr==='danger'?`Sign Up failed`:''}</span>
           <button className={`close btn btn-${Stage.curr} btn-sm`} data-dismiss="alert" aria-label="Close" onClick={()=>setshowAlert(false)}>
            <span aria-hidden="true">X</span>
           </button>
         </div>
       </Alert>
          <form onSubmit={handleSubmit}>
              <div className="mb-3 form-container">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input {...nameBind} value={name} className="form-control" id="name" name="name" required />
                  <div className="form-text">This is to ease your login later on</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" value={email} {...emailBind} className="form-control" id="email" required name="email" aria-describedby="emailHelp" />
                  <div id="emailHelp"className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" {...passwordBind} value={password} className="form-control" required name="password" id="password" />
              </div>
              
       <div className="d-flex justify-content-between my-3">
           <span>
           <button onClick={reset} className="btn btn-secondary mx-2">Reset</button>
           <button type="submit" className="btn btn-primary mx-2">Sign up</button>
           </span>
            <span className="text-primary">Already have an account?<Link to="/login" className="btn btn-danger mx-2">Log in</Link></span> 
       </div>
 
          </form>
      </div>
    )
}

export default Signup
