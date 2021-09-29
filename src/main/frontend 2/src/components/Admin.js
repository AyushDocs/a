import { React, useEffect, useState } from "react";
import AdminItem from './items/AdminItem';
const MAX_OFFSET=1;
export default function Admin(props) {
  const [Items, setItems] = useState([]);
  const [Offset, setOffset] = useState(0)
  useEffect(() =>{
    fetch(`http://localhost:8080/api/query/?offset=0`)
    .then(res => res.json())
    .then(data =>{setItems(data.content.reverse())})
  },[])
  useEffect(() => {
    setInterval(async() =>{
      const data=await fetch(`http://localhost:8080/api/query/?offset=${Offset}`)
      const parsedData=await data.json();
      if(parsedData.content.reverse()!==Items)setItems(data.content.reverse())
      },1000*60*20)
  }, [Items, Offset])
  const onClickBack=()=>{
    fetch(`http://localhost:8080/api/query/?offset=${Offset-1}`)
    .then(res=>res.json())
    .then(data=>{setItems(data.content.reverse())})
    setOffset(Offset-1)
  };
  const onClickNext=()=>{
    fetch(`http://localhost:8080/api/query/?offset=${Offset+1}`)
    .then(res=>res.json())
    .then(data=>{setItems(data.content.reverse())})
     setOffset(Offset+1)
  };
  useEffect(() => {
    if(Offset===0){
      document.getElementById('back').style.cursor='none';
      document.getElementById('back').style.opacity=0.3;
    }
    if(Offset!==0 && document.getElementById('back').style.cursor==='none'){
      document.getElementById('back').style.cursor='pointer';
      document.getElementById('back').style.opacity=1;
    }
    if(Offset===MAX_OFFSET){
      document.getElementById('next').style.cursor='none';
      document.getElementById('next').style.opacity=0.3;
    }
    if(Offset!==MAX_OFFSET && document.getElementById('next').style.cursor==='none'){
      document.getElementById('next').style.cursor='pointer';
      document.getElementById('next').style.opacity=1;
    }
  }, [Offset])
  return (
    <div className="container">
      <h1>Hello Admin</h1>
      <AdminItem isNotLink={true} number="S.no" email="Email" query_id="Query Id" date="Date"/>
      {Items.map(elem=>(
      <AdminItem isNotLink={false} number={Items.indexOf(elem)+1} email={elem.email} query_id={elem.id} key={elem.query_id}
      date={elem.date} query={elem.query}/>)
      )}
      <button onClick={onClickBack} id='back' className="btn btn-danger my-5 btn-sm page">Back</button>
      <button onClick={onClickNext} style={{float: 'right'}} id='next' className="btn btn-danger my-5 btn-sm page">Next</button>

     </div>
  );
}
