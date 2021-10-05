import { React } from "react";
import { Link, useLocation } from 'react-router-dom';
export default function Navbar() {
  const location=useLocation()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" styles={{marginBottom:'50px'}} >
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/'?'active':''}`} id="Home" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} id="About" aria-current="page" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/post'?'active':''}`} id="Post" aria-current="page" to="/post">Post</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname.startsWith('/publications/')?'active':''}`} id="Publications" aria-current="page" to="/publications/1">Publications</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname.startsWith('/admin')||location.pathname.startsWith('/login')?'active':''}`} id="Publications" aria-current="page" to="/admin/0">Login</Link>
          </li>
        </ul>
       <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  );
}
