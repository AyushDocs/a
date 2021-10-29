import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Typed from 'typewriter-effect';
import useInput from '../hooks/useInput';
import Alert from './Alert';
const typerConfig={loop: true,backSpeed:15,typeSpeed:25}
const OnInit=(typewriter)=>typewriter
.typeString('Please Enter your query.').pauseFor(2000).deleteAll()
.typeString("Dr Alok will reply shortly.").pauseFor(2000).start()
const AlertSucessText="Message Sent "
const AlertFailureText="Failed to send message"
const emailPlaceholder='Enter your email'
const queryPlaceholder='Enter your query'

const api=axios.create({
  baseURL:'http://localhost:8080'
})


export default function Form(props) {
  const [Success, setSuccess] = useState(false);
  const [Failure, setFailure] = useState(false);
  const [email,emailBind,emailReset]=useInput('')
  const [query,queryBind,queryReset]=useInput('')
  console.log('in form from authentication');
  const onSubmit=e=>{
    e.preventDefault();
    api.post("/api/query/",[{query,email}])
    .then(res=> {
      res.status===200 ? setSuccess(true) : setFailure(true);
    })
    .catch(() =>setFailure(true))
    .finally(()=>{emailReset();queryReset()})
  }  
  const reset=()=>{emailReset();queryReset()}
  const onCloseClick=()=>{
    props.toggle()
    reset()
    setFailure(false)
    setSuccess(false)
  }
  const close=<button onClick={onCloseClick} className="btn btn-danger">X</button>
  return (<Modal className="modal-scrollable" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader className="bg-dark text-light" toggle={props.toggle} close={close}>
        <b><Typed options={typerConfig} onInit={typeWriter=>OnInit(typeWriter)}/></b> 
      </ModalHeader>
      <form onSubmit={onSubmit}> 
      <ModalBody className="bg-dark text-light">  
        {Success && <Alert h1={false} finalize={()=>{setSuccess(false)}} text={AlertSucessText} colour="success"/>}
        {Failure && <Alert h1={false} finalize={()=>{setFailure(false)}} text={AlertFailureText} colour="danger" />}       
        <input type="email" placeholder={emailPlaceholder} {...emailBind}className="form-control my-3 text-dark" name="email" required />
        <textarea placeholder={queryPlaceholder} {...queryBind} className="form-control my-4" name="query" style={{ height: 100 }}required></textarea>
      </ModalBody>
      <ModalFooter className="bg-dark text-light">
        <Button color="primary" onClick={reset}>Reset</Button>{' '}
        <Button color="secondary" onClick={onCloseClick}>Cancel</Button>
        <Button type="submit" color="danger">Send</Button>
      </ModalFooter>
      </form>
    </Modal>)
}