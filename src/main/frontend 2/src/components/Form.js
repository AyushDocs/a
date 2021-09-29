import React, { useState } from "react";
//import Typed from 'react-typed';
import "../css/Form.css";
import Alert from './Alert';
export default function Form() {
  const [Success, setSuccess] = useState(false);
  const [Failure, setFailure] = useState(false);
  const send = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/query/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          query: document.getElementById("form__question").value,
          email: document.getElementById("form__email").value,
        },
      ]),
    })
      .then((res) => {
        res.status ? setSuccess(true) : setFailure(true);
      })
      .catch(() => {
        setFailure(true);
      });
  };
  const removeValue = (e) => {
    e.target.value = "";
  };
  return (
    <>
{Success === true && (
<Alert
  text="Message Sent sucessfully.Dr alok will reply shortly. If you have any other doubts please do inform us."
  colour="success"
/>
)}
{Failure && <Alert text="Failed to send message" colour="danger" />}
<div className="container my-2 form-container form-floating">
<form  onSubmit={send} id="post__form">
  <div >
    <h3 id="h3" className="my-3">
      {/* <Typed
        strings={[
          "Please Enter your query",
          " Dr Alok will reply shortly",
        ]}
        backSpeed={15}
        smartBackspace={true}
        backDelay={1200}
        startDelay={1000}
        typeSpeed={25}
        loop={true}
      /> */}
      Please enter your details
    </h3>
    <hr className="dropdown-divider" />
    <input
      onClick={removeValue}
      className="form-control my-3"
      id="form__email"
      required
      defaultValue="Please enter your email"
      type="email"
      name="email"
    />
    <textarea
      onClick={removeValue}
      className="form-control"
      id="form__question"
      name="query"
      style={{ height: 100 }}
      required
      defaultValue="Enter question here"
    ></textarea>
  </div>
  <div className="container">
    <button
      className="btn btn-success btn-outline-light my-2"
      type="submit"
      id="submit"
    >
      Send
    </button>
  </div>
</form>
</div>
</>
     )};