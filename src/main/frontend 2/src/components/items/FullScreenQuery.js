import { React, useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
export default function FullScreenQuery(props) {
  const [Data, setData] = useState({})
  const {id}=useParams()
  useEffect(() => {
    fetch(`http://localhost:8080/api/query/id/${id}`)
    .then(res=>res.json())
    .then(data=>{setData(data)})
  }, [id])
  const deleteQuery =()=>{
    if(window.confirm('Are you sure you want to delete this'))
      fetch(`http://localhost:8080/api/query/${Data.id}`,{method:'delete'})  
      window.location.href='http://localhost:3000/admin'
  }
  return (
    <>
      <div className="container my-2 form-container form-floating ">
        <input readOnly defaultValue={Data.email} className="my-3 form-control"type="email"name="email"/>
        <textarea readOnly className="my-4 form-control" defaultValue={Data.query}style={{ height: 100 }}></textarea>
        <input readOnly className="my-3 form-control"defaultValue={Data.id}/>
        <input readOnly className="my-3 form-control" defaultValue={Data.date}/>
        <Link to="/admin" className="btn btn-primary">Back</Link>
        <button styles={{float:'right'}} onClick={deleteQuery} className="btn btn-danger">Delete</button>
      </div>
      </>
  );
}
