import React from "react";
const classes = (colour) =>`alert alert-${colour} alert-dismissible fade show`;
export default function Alert(props) {
  return (
    <div className={classes(props.colour)} role="alert">
      {props.text}
      <button
      onClick={props.finalize}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
