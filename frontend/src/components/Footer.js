import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className="text-center text-white bg-dark">
          <div className="container p-4">
            <section className="mb-4">
              <Link className="btn btn-outline-light btn-floating m-1" to="/" role="button"
                ><i className="fab fa-facebook-f"></i
              ></Link>
              <Link className="btn btn-outline-light btn-floating m-1" to="/" role="button"
                ><i className="fab fa-twitter"></i
              ></Link>
        
              <Link className="btn btn-outline-light btn-floating m-1" to="/" role="button"
                ><i className="fab fa-google"></i
              ></Link>
        
              <Link className="btn btn-outline-light btn-floating m-1" to="/" role="button"
                ><i className="fab fa-instagram"></i
              ></Link>
        
              <Link className="btn btn-outline-light btn-floating m-1" to="/" role="button"
                ><i className="fab fa-linkedin-in"></i
              ></Link>
        
              <Link className="btn btn-outline-light btn-floating m-1" to="/" role="button"
                ><i className="fab fa-github"></i
              ></Link>
            </section>
            <section className="mb-4">
              <p><strong>Email Me: @gmail.com</strong></p>
            </section>
            <section>
              <div className="row">
                  <h5 className="text-uppercase">Links</h5>
                  <ul className="list-unstylesd mb-0 row ">
                    <li className="col-md-3">
                      <Link to="/" className="text-white">Home</Link>
                    </li>
                    <li className="col-md-3">
                      <Link to="/about" className="text-white">About</Link>
                    </li>
                    <li className="col-md-3">
                      <Link to="/post" className="text-white">Contact Us</Link>
                    </li>
                    <li className="col-md-3">
                      <Link to="/publications" className="text-white">View Publications</Link>
                    </li>
                  </ul>
                </div>
            </section>
          </div>
          <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            © 2021 Copyright
          </div>
        </footer>
    )
}
