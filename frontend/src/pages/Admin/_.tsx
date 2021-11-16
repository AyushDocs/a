import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import AdminItem, { AdminItemProps, AdminItemSkeleton } from '../../components/AdminItem';
import useInput from "../../hooks/useInput";
const page=6
interface Data{
  content:[{
  query:string,
  password:string,
  id:string
  email:string
  query_id:string
  date:Date
  }]
  last:boolean
}
export default function Admin() {
  const [SortBy, sortByBind]=useInput('date');
  const [Checked, setChecked] = useState<string>('ASC');
  const [Offset, setOffset] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [loading, setloading] = useState(false)
  const [data, setData] = useState<Data|null>();
  useEffect(() => {
    let isMounted = true;
    setloading(true)
    fetch(`http://localhost:8080/api/query/?SortBy=${SortBy}&SortBy=${Checked}&offset=${Offset}&size=${page}`)
    .then(res => {
        if (isMounted) res.json().then(recdata => setData(recdata));
      })
      .catch(() => {
        if (isMounted) setData(null);
      })
      .finally(()=>setloading(false))
  }, [Checked, Offset, SortBy]);
  
  useEffect(() => {
    if(data) setIsLast(data.last);
    const backBtn:HTMLButtonElement = document?.querySelector("#back")!;
    const nextBtn:HTMLButtonElement = document?.querySelector("#next")!;
    if (Offset === 0) {
      backBtn.disabled = true;
    }
    if (Offset !== 0 && backBtn.disabled === true) {
      backBtn.disabled = false;
    }
    if (isLast) {
      nextBtn.disabled = true;
    }
    if (!isLast && nextBtn.disabled === true) {
      nextBtn.disabled = false;
    }
  }, [Offset, data, data?.last, isLast]);

  return (
    <>    
      <div className="container">
        {/* search bar */}
        <div className="d-flex justify-content-center my-2">
          <Link className="btn btn-outline-danger" to="/admin/publications/">Publications</Link>
        </div>
        <div className="d-flex mt-3">
          <select className="form-control me-2 width-30 justify-content-center" {...sortByBind}>
            <option value="date">Sort By...</option>
            <option value="date">date</option>
            <option value="id">id</option>
            <option value="query">query</option>
            <option value="email">email</option>
          </select>
          <div className="form-check no-border width-30 form-switch form-control">
            <label className="form-check-label " htmlFor="flexSwitchCheckDefault">
              <b>Reverse Content</b>
            </label>
            <input className="form-check-input" onChange={()=>setChecked(Checked==='ASC'?'DESC':'ASC')} type="checkbox" role="switch"/>
          </div>
          <button className="btn btn-sm btn-secondary" type="submit">
            Search
          </button>
        </div>
        {loading && <Spinner />}
        {data?.content.length<1 && <span className="text-center"><h3><b className="goog-font">No questions for you</b></h3></span>}
        <div className="row">
            {data?.content.map((item:AdminItemProps)=>{return(<div key={item.id} className="col-md-4"><AdminItem {...item} /></div>)})}
           {loading && [1,2,3,4,5,6].map((item)=> 
           <div key={item} className="col-md-4"> <AdminItemSkeleton/></div>
           )}
           </div>
           <div className="d-flex justify-content-between">
          <button onClick={() =>setOffset(Offset - 1)} id="back" className="btn-sm btn btn-danger">←Back</button>
          <button onClick={() =>setOffset(Offset + 1)} id="next" className="btn-sm btn btn-danger">Next→</button>
           </div>
       
      </div>
    </>
  );
}
