import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { login } from '../Auth';
import useInput from '../hooks/useInput';
import { toggle } from '../slices/authModal';
import { setTrue } from '../slices/CheckAgainForAuthentication';
import Alert from './Alert';
export default function Authentication(props) {
  const [email,emailBind,emailReset]=useInput('')
  const [password,passwordBind,passwordReset]=useInput('')

  const [Failure, setFailure] = useState(false)
  const AuthModal = useSelector(state => state.authModal.value)
  const dispatch = useDispatch()

  const toggleLogin =() => dispatch(toggle());
  const reset=()=>{emailReset();passwordReset()}
  const onSubmit=e=>{
    e.preventDefault()
    login(email,password)
    .then(success=>{
      if(success){
      toggleLogin()
      dispatch(setTrue())
      }
      else{
        setFailure(true)
      }
      })
      .catch(()=>setFailure(true))
  }
  const onCloseClick=()=>{toggleLogin();reset();setFailure(false)}
  const close=<button onClick={onCloseClick} className="btn btn-danger">X</button>
  return(<Modal backdrop="static" className="modal-scrollable"isOpen={AuthModal} toggle={toggleLogin}>
      <ModalHeader className="bg-dark text-light modal-title goog-font" toggle={toggleLogin} close={close}>
         Enter your Login Credentials 
      </ModalHeader>
      <form onSubmit={onSubmit}> 
      <ModalBody className="bg-dark text-light">
      <div className="my-2 form-container">
      {Failure &&<Alert finalize={()=>{setFailure(false)}} text={`Please enter correct credentials`} colour="danger" />}
        <div>
          <label className="form-label text-light ">Please enter your Email</label>
          <input placeholder="Enter your email"title="Email" className="form-control my-1 mb-2" {...emailBind} autoComplete='on' required type="email"/>
          <label className="form-label text-light" >Please enter your Password</label>
          <input  placeholder="Enter your password"className="form-control mb-2" {...passwordBind} autoComplete='on' required type="password"/> 
        </div>
    </div>
      </ModalBody>
      <ModalFooter className="bg-dark text-light">
        <Button color="primary" onClick={reset}>Reset</Button>{' '}
        <Button color="secondary" onClick={toggleLogin}>Cancel</Button>
        <Button type="submit" color="danger">Send</Button>
      </ModalFooter>
      </form>
    </Modal>)
}