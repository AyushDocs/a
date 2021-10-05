import { React, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import "../css/publication.css";
import PublicationItem from "./items/publication_item";
export default function Publication() {
  const {Offset}=useParams()
  const [Publications, setPublications] = useState([])
  useEffect(() => {
    fetch(`/api/publications/?offset=${Offset}`)
    .then(res => res.json())
    .then(data =>setPublications(data.content));
  }, [Offset])
  return (
    <div className="container">
      <div className="content my-2">
        <h1>Publications from Dr Alok Dubey </h1>
        <hr />
        {Publications.map(e =><PublicationItem author={e.author} key={e.id} heading={e.name}/>)}
      </div>
      <Link to={`/publications/${Offset-1}`} className="btn btn-sm btn-danger">←Back</Link>
      <Link to={`/publications/${Offset+1}`} className="btn btn-sm btn-danger next">Next→</Link>
    </div>
  );
}
