import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import auth from '../../auth';
export default function FullScreenQuery(props) {
  let history=useHistory();
  const [Data, setData] = useState({email:'',query:'',id:'',date:''})
  const {Offset}=useParams()
  useEffect(() => {
    const token=JSON.parse(localStorage.getItem('login')).token
    const email=JSON.parse(localStorage.getItem('login')).email
    const config={headers: {Authorization: token,email: email}}
    fetch(`/api/query/id/${Offset}`,config)
    .then(res=>res.json())
    .then(data=>{setData(data)})
  }, [Offset])
 // if(!auth.isAuthenticated())return <Redirect to={{pathname:`/login/${Offset}`}}/>
  if(!auth.isAuthenticated())history.push(`/login/${Offset}`)
  const deleteQuery =()=>{
    const token=JSON.parse(localStorage.getItem('login')).token;
    const email=JSON.parse(localStorage.getItem('login')).email
    const config={method:'delete',headers:{Authorization: token,email:email}}
    if(window.confirm('Are you sure you want to delete this'))
     fetch(`/api/query/${Data.id}`,config)
  }
  return (
    <>
      <div className="container my-2 form-container form-floating ">
        <input readOnly defaultValue={Data.email} className="my-3 form-control"type="email"name="email"/>
        <textarea readOnly className="my-4 form-control" defaultValue={Data.query}style={{ height: 100 }}></textarea>
        <input readOnly className="my-3 form-control"defaultValue={Data.id}/>
        <input readOnly className="my-3 form-control" defaultValue={Data.date}/>
        <Link to="/admin/0" className="btn btn-primary">Back</Link>
        <Link to="/admin/0" styles={{float:'right'}} onClick={deleteQuery} className="btn btn-danger">Delete</Link>
      </div>
      </>
  );
}
