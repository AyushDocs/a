import React from "react";
import Alert from 'react-bootstrap/Alert';
export default function AlertComponent(props) {
  return (
    <Alert show={props.show} dismissible variant={props.colour}>
      <Alert.Heading>{props.text}</Alert.Heading>
      <button onClick={props.finalize} type="button" className="btn-close" data-bs-dismiss="alert"
        aria-label="Close"></button>
    </Alert>
  );
}
