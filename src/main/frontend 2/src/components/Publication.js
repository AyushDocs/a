import { React, useState } from "react";
import "../css/publication.css";
import PublicationItem from './items/publication_item';
let ExportSetOffset;
export default function Publication() {
 const [offset, setOffset] = useState(1)
 ExportSetOffset=setOffset;
 const size=1;  
  const listOfPublications=
   fetch(`http://localhost:8080/api/publications/paginate/?offset=${offset}&size=${size}`)
    .then(res=>res.json())
    .then(data=>data)
    .listOfPublications;
  return (
    <div className="container">
      <div className="content my-2">
      <h1>Publications from Dr Alok Dubey </h1><hr/>
        {listOfPublications.map((element)=>
        {return<PublicationItem key={element.PublicationId} heading={element.heading} text={element.text}/>})}
        </div>
      <button className="btn btn-sm btn-danger">←Back</button>
      <button className="btn btn-sm btn-danger next">Next→</button>
    </div>)};
export { ExportSetOffset };

