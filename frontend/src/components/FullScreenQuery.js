import Cookies from "js-cookie";
import React from "react";
import { Link, useHistory } from "react-router-dom";
export default function FullScreenQuery(props) {
  const history = useHistory();
  const Data = props.location.state;
  const deleteQuery = () => {
    const storage = Cookies.get("login");
    const token = storage.token || "";
    const email = storage.email || "";
    const config = {
      method: "DELETE",
      headers: { Authorization: token, email: email }
    };
    if (window.confirm("Are you sure you want to delete this"))
      fetch(`http://localhost:8080/api/query/${Data.id}`, config).then(() =>
        history.push("/admin/")
      );
  };
  return (
    <>
      <div className="container my-2 form-container form-floating ">
        <input
          readOnly
          defaultValue={Data.email}
          className="my-3 form-control"
          type="email"
          name="email"
        />
        <textarea
          readOnly
          className="my-4 form-control"
          defaultValue={Data.query}
          style={{ height: 100 }}
        ></textarea>
        <input readOnly className="my-3 form-control" defaultValue={Data.id} />
        <input
          readOnly
          className="my-3 form-control"
          defaultValue={Data.date}
        />
        <Link to="/admin/" className="btn btn-primary">
          Back
        </Link>
        <Link
          to="/admin/"
          style={{ float: "right" }}
          onClick={deleteQuery}
          className="btn btn-danger"
        >
          Delete
        </Link>
      </div>
    </>
  );
}
