import React, { useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import Typed from "typewriter-effect";
import useInput from "../hooks/useInput";
const typerConfig = { loop: true, backSpeed: 15, typeSpeed: 25 };
const OnInit = (typewriter:any) =>
  typewriter
    .typeString("Please Enter your query.")
    .pauseFor(2000)
    .deleteAll()
    .typeString("Dr Alok will reply shortly.")
    .pauseFor(2000)
    .start();
const AlertSucessText = "Message Sent ";
const AlertFailureText = "Failed to send message";
const emailPlaceholder = "Enter your email";
const queryPlaceholder = "Enter your query";
interface Props{
modal:boolean;
toggle:()=>void
}
export default function Form(props:Props) {
  const [Success, setSuccess] = useState(false);
  const [Failure, setFailure] = useState(false);
  const [email, emailBind, emailReset] = useInput("");
  const [query, queryBind, queryReset] = useInput("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (e:React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    setSuccess(false)
    setFailure(false)
    const options={method: 'POST','Content-Type':'application/json',body: JSON.stringify({ query, email })}
    fetch("http://localhost:8080/api/query/",options)
      .then(res=> {
        if(!res.ok) setFailure(true);
        setSuccess(true)      
        emailReset()
        queryReset() 
      })
      .catch(() =>setFailure(true))
      .finally(() =>setLoading(false));
  };
  const reset = () => {
    emailReset();
    queryReset();
  };
  const onCloseClick = () => {
    props.toggle();
    reset();
    setFailure(false);
    setSuccess(false);
  };
  const close =<Button color="danger" onClick={onCloseClick}>X</Button>
  return (
    <Modal className="modal-scrollable" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader className="bg-dark text-light" toggle={props.toggle} close={close}>
        <b>
          <Typed options={typerConfig} onInit={(typeWriter) => OnInit(typeWriter)} />
        
        </b>
      </ModalHeader>
        <ModalBody className="bg-dark text-light">
          <Alert color="success" isOpen={ Success }>
            <div className="d-flex justify-content-between">
             <span className="alert-text">{AlertSucessText}</span>
             <Button color="dark" className="close btn-sm" data-dismiss="alert" aria-label="Close" onClick={()=>setSuccess(false)}>
              <span aria-hidden="true">X</span>
             </Button>
            </div>
          </Alert>
          <Alert color="danger" isOpen={ Failure }>
            <div className="d-flex justify-content-between">
              <span className="alert-text">{AlertFailureText}</span>
              <button className="close btn btn-sm btn-danger" data-dismiss="alert" aria-label="Close" onClick={()=>setFailure(false)}>
               <span aria-hidden="true">X</span>
              </button>
            </div>
          </Alert>
          <input type="email" placeholder={emailPlaceholder} {...emailBind}className="form-control my-3 text-dark" required/>
          <textarea placeholder={queryPlaceholder}{...queryBind} className="form-control my-4" style={{ height: 100 }} required></textarea>
        </ModalBody>
        <ModalFooter className="bg-dark text-light d-flex justify-content-around">
        {loading && <Spinner />}
        <form onSubmit={onSubmit}>
          <Button className="mx-2" color="primary" onClick={reset}>Reset</Button>
          <Button className="mx-2" color="secondary" onClick={onCloseClick}>Cancel</Button>
          <Button className="mx-2" type="submit" color="danger">Send</Button>
         </form>
        </ModalFooter>
    </Modal>
  );
}
