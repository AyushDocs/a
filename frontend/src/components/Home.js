import { Link } from 'react-router-dom'
const papaimg='data:image/jpeg;base64,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'
export default function Home(){
    return(
      <>
  <section className="bg-dark p-5  text-light text-center">
    <div className="container d-flex justify-content-between">
      <div>
        <h1 className="fw-light">Welcome to AlokMeds</h1>
        <p className="lead">Get all your doubts clear and also view my latest publications</p>
        <p>
          <Link to="/login" className="btn btn-primary mx-2">Login</Link>
          <Link to="/signup"className="btn btn-danger mx-2">Sign up</Link>
        </p>
      </div>
      <div><img className="img-fluid rounded-circle" src={papaimg} alt="" /></div>
    </div>
  </section>
   <div className="row">
    <h1 className="d-flex text-center goog-font">View Latest Publications</h1>
      <div className="col-md-1 d-flex align-items-center">    
         <button className="btn btn-primary"><i className="fas fa-arrow-circle-left"></i></button>
      </div>
        <div className="col-md-3">
            {/* start*/ }
             <div className="card bg-light ">
          <div className="card-body text-center py-0">
            <img className="img-fluid rounded-circle" src={papaimg} alt="" />
             <h3 className="card-title text-dark">Alok Dubey</h3>
            <p className="card-text text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, reprehenderit.</p>
            <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  </div>
                  <small className="text-muted">9 mins ago</small>
                </div>
          </div>
        </div>
            {/* end*/ }
        </div>
        <div className="col-md-4">
                      {/* start*/ }
                      <div className="card bg-light ">
          <div className="card-body text-center py-0">
            <img className="img-fluid rounded-circle" src={papaimg} alt="" />
            <h3 className="card-title text-dark">Alok Dubey</h3>
            <p className="card-text text-dark">Lorem ipsum dolor sit Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur adipisicing.
             amet consectetur adipisicing elit. Modi, reprehenderit.</p>
            <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  </div>
                  <small className="text-muted">9 mins ago</small>
            </div>
          </div>
        </div>
            {/* end*/ }
        </div>
        <div className="col-md-3">
                      {/* start*/ }
          <div className="card bg-light ">
          <div className="card-body text-center py-0">
            <img className="img-fluid rounded-circle" src={papaimg} alt="" />
            <h3 className="card-title text-dark">Alok Dubey</h3>
            <p className="card-text text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, reprehenderit.</p>
          <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  </div>
                  <small className="text-muted">9 mins ago</small>
            </div>
        </div>
            {/* end*/ }
        </div>
    </div>
    <div className="col-md-1 d-flex align-items-center">    
         <button className="btn btn-primary"><i className="fas fa-arrow-circle-right"></i></button>
      </div>
    </div>
  </>
    )
}