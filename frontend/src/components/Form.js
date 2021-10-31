import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import Typed from "typewriter-effect";
import useInput from "../hooks/useInput";
const typerConfig = { loop: true, backSpeed: 15, typeSpeed: 25 };
const OnInit = (typewriter) =>
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

const api = axios.create();

export default function Form(props) {
  const [Success, setSuccess] = useState(false);
  const [Failure, setFailure] = useState(false);
  const [email, emailBind, emailReset] = useInput("");
  const [query, queryBind, queryReset] = useInput("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    setSuccess(false)
    setFailure(false)
    api
      .post("/api/query/", [{ query, email }])
      .then((res) => {
        if( res.status === 200){
          setSuccess(true)      
          emailReset()
          queryReset()
        }
        else setFailure(true);
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
  const close = (
    <button onClick={onCloseClick} className="btn btn-danger">
      X
    </button>
  );
  return (
    <Modal
      className="modal-scrollable"
      isOpen={props.modal}
      toggle={props.toggle}
    >
      <ModalHeader
        className="bg-dark text-light"
        toggle={props.toggle}
        close={close}
      >
        <b>
          <Typed
            options={typerConfig}
            onInit={(typeWriter) => OnInit(typeWriter)}
          />
          {loading && <Spinner />}
        </b>
      </ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody className="bg-dark text-light">
          <Alert color="success" isOpen={ Success }>
            <div className="d-flex justify-content-between">
             <span className="alert-text">Successfully Sent Query</span>
             <button className="close btn btn-sm btn-dark" data-dismiss="alert" aria-label="Close" onClick={()=>setSuccess(false)}>
              <span aria-hidden="true">X</span>
             </button>
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
          <input
            type="email"
            placeholder={emailPlaceholder}
            {...emailBind}
            className="form-control my-3 text-dark"
            name="email"
            required
          />
          <textarea
            placeholder={queryPlaceholder}
            {...queryBind}
            className="form-control my-4"
            name="query"
            style={{ height: 100 }}
            required
          ></textarea>
        </ModalBody>
        <ModalFooter className="bg-dark text-light">
          <Button color="primary" onClick={reset}>
            Reset
          </Button>{" "}
          <Button color="secondary" onClick={onCloseClick}>
            Cancel
          </Button>
          <Button type="submit" color="danger">
            Send
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
