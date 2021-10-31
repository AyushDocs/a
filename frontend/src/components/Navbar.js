import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { toggle } from "../slices/postModal";
import Form from "./Form";
export default function Navbar() {
  const dispatch = useDispatch();
  const togglePost = () => {
    dispatch(toggle());
  };
  const modal = useSelector((state) => state.postModal.value);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid ">
      <div className="container">
        <Link className="navbar-brand" aria-current="page" to="/home">
          AlokMeds
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
          aria-controls="navmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav me-auto ms-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link cursor" onClick={togglePost}>
                Ask A Doubt
              </span>
              <Form toggle={togglePost} modal={modal} />
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/publications/0">Publications</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
