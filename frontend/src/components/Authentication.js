import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from "reactstrap";
import { adminLogin } from "../Auth";
import useInput from "../hooks/useInput";
import { toggle } from "../slices/authModal";
import { setTrue } from "../slices/CheckAgainForAuthentication";
export default function Authentication(props) {
  const [email, emailBind, emailReset] = useInput("");
  const [password, passwordBind, passwordReset] = useInput("");
  const [loading, setLoading] = useState(false);

  const [Failure, setFailure] = useState(false);
  const history = useHistory();
  const AuthModal = useSelector((state) => state.authModal.value);
  const dispatch = useDispatch();

  const toggleLogin = () => dispatch(toggle());
  const reset = () => {
    emailReset();
    passwordReset();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    adminLogin(email, password)
      .then((success) => {
        if (success) {
          toggleLogin();
          dispatch(setTrue());
        } else {
          setFailure(true);
        }
      })
      .catch(() => setFailure(true))
      .finally(() => {
        setLoading(false);
      });
  };
  const close = (<></>);
  return (
    <Modal
      backdrop="static"
      className="modal-scrollable"
      isOpen={AuthModal}
      toggle={toggleLogin}
    >
      <ModalHeader
        className="bg-dark text-light modal-title goog-font"
        toggle={toggleLogin}
        close={close}
      >
        Enter your Login Credentials
        {loading && <Spinner />}
      </ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody className="bg-dark text-light">
          <div className="my-2">  
        <Alert color="danger" isOpen={ Failure }>
          <div className="d-flex justify-content-between">
          <span className="alert-text">Please enter correct credentials</span>
          <button className="close btn btn-danger btn-sm" data-dismiss="alert" aria-label="Close" onClick={()=>setFailure(false)}>
           <span aria-hidden="true">X</span>
          </button>
          </div>
        </Alert>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                {...emailBind}
                className="form-control my-3 py-2 text-dark"
                name="email"
                required
              />
              <input
                placeholder="Enter your password"
                className="form-control my-4 py-2"
                {...passwordBind}
                autoComplete="on"
                required
                type="password"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="bg-dark text-light">
          <Button
            color="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            Back to Home Page
          </Button>
          <Button color="success" onClick={reset}>
            Reset
          </Button>{" "}
          <Button type="submit" color="danger">
            Send
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
