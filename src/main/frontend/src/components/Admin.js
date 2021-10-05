import { React, useEffect, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import auth from '../auth';
import AdminItem from './items/AdminItem';
let isLast=false;
export default function Admin(props) {
  let history=useHistory()
  const Offset=parseInt(useParams().Offset)
  const [Items, setItems] = useState([]);
  useEffect(() =>{
    if(auth.isAuthenticated()){
      const login =JSON.parse(localStorage.getItem('login'))
    const token=login.token
    const email=login.email
    const config={headers:{ "Authorization": token,"email":email}}
    if(Offset>-1){
    fetch(`/api/query/?offset=${Offset}`,config)
    .then(res => res.json())
    .then(data =>{
      setItems(data.content.reverse())
      isLast=data.last
    })
    }
   
    }
  },[Offset])
  
  useEffect(() => {
  // if(!auth.isAuthenticated()) return (<Redirect to={{pathname:`/login/${Offset}`}}/>)
  if(!auth.isAuthenticated()) return  history.push(`/login/${Offset}`)
    
    if(auth.isAuthenticated()){
      if(Offset===0){
      document.getElementById('back').style.display='none';
    }
    if(Offset!==0 && document.getElementById('back').style.display==='none'){
      document.getElementById('back').style.display='inline';
    }
    if(isLast){
      document.getElementById('next').style.display='none'
    }
    if(!isLast && document.getElementById('next').style.display==='none'){
      document.getElementById('next').style.display='inline'
    }
    }
    
  }, [Offset, history])
  if(!auth.isAuthenticated()){
   // history.push(`/login/${Offset}`)
    return (<Redirect to={{pathname:`/login/${Offset}`}}/>)
  }
  return (
    <div className="container">
      <h1>Hello Dr Alok</h1>
      <AdminItem isNotLink={true} number="S.no" email="Email" query_id="Query Id" date="Date"/>
      {Items.map(elem=>(
      <AdminItem isNotLink={false} number={Items.indexOf(elem)+1} email={elem.email} query_id={elem.id}
      key={elem.id}  date={elem.date} query={elem.query}/>)
      )}
      <Link to={`/admin/${Offset-1}`} id='back' className="btn btn-danger my-5 btn-sm page">←Back</Link>
      <Link to={`/admin/${Offset+1}`} id='next' className="btn btn-danger my-5 btn-sm page" style={{float: 'right'}} >Next→</Link>
     </div>
  );
}
