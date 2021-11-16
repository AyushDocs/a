import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import PublicationItem, { Props as PublProps } from "../components/PublicationItem";
import { PublicationType } from "../enums/PublicationType";
export default function Publication(props:{type:PublicationType}) {
  const [Offset, setOffset] = useState(0)
  const [Publications, setPublications] = useState<PublProps[]>([]);
  const [last, setIsLast] = useState(true);
  const [hasError, setError] = useState(false);
  useEffect(() => {
    let isMounted = true;    
    if (isMounted ) {
      fetch(`http://localhost:8080/api/publications/?offset=${Offset}&page=4`)
        .then((res) =>isMounted?res.json():null)
        .then((data) =>{
          if(!isMounted)return
          setPublications(data.content)
          console.log(data.content);
          
          setIsLast(data.last)
          })
        .catch(() =>isMounted?setError(true):null);
    }
    return ()=>{isMounted=false}
  }, [Offset]);
  useEffect(() => {
    const backBtn:HTMLButtonElement = document?.querySelector("#back-publ")!;
    const nextBtn:HTMLButtonElement = document?.querySelector("#next-publ")!;
    if (Offset === 0) {
      backBtn.disabled = true;
    }
    if (Offset !== 0 && backBtn.disabled === true) {
      backBtn.disabled = false;
    }
    if (last) {
      nextBtn.disabled = true;
    }
    if (!last && nextBtn.disabled === true) {
      nextBtn.disabled = false;
    }
  }, [Offset, last]);
  return (
    <div className="container">
      <div className="content my-2">
        {hasError && <Alert color="danger">Slow Internet....</Alert>}
         <h1>Publications from Dr Alok Dubey </h1>
         <hr />
         <div className="row">
           {Publications?.map(item=>( <div className="col-md-4"key={item.id}><PublicationItem type={props.type}  {...item} /></div>))}
         </div>
         <div className="d-flex justify-content-between">
          <button onClick={()=>setOffset(()=>Offset - 1)} className="btn btn-sm btn-danger" id="back-publ" >←Back</button>
          <button onClick={()=>setOffset(()=>Offset + 1)} className="btn btn-sm btn-danger" id="next-publ">Next→</button>
         </div>
      </div>
    </div>
  );
}

