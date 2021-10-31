//import { Alert } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert } from "reactstrap";
export default function Publication() {
  const [Publications, setPublications] = useState([]);
  const [last, setIsLast] = useState(true);
  const Offset = parseInt(useParams().Offset);
  const [hasError, setError] = useState(false);
  console.log(Offset);
  //const [Publications, setPublications] = useLocalStorage('publications',[])
  //const[,data,]=useFetch(`http://localhost:8080/api/publications/?offset=${Offset}&page=4`)
  //console.log(data);
  //useEffect(() =>setPublications(data.content), [data.content, setPublications])
  useEffect(() => {
    if (Offset > -1) {
      fetch(`http://localhost:8080/api/publications/?offset=${Offset}&page=4`)
        .then((res) => res.json())
        .then((data) => setPublications(data.content))
        .catch((err) => setError(true));
    }
  }, [Offset]);
  useEffect(() => {
    setIsLast(last);
    const back = document?.getElementById("back-publ");
    const next = document?.getElementById("next-publ");
    if (back === null || next === null) return;
    if (Offset === 0) {
      back.disabled = true;
    }
    if (Offset !== 0 && back.disabled === true) {
      back.disabled = false;
    }
    if (last) {
      next.disabled = true;
    }
    if (!last && next.disabled === true) {
      next.disabled = false;
    }
  }, [Offset, last]);
  return (
    <div className="container">
      <div className="content my-2">
        {hasError && <Alert color="danger">Slow Internet....</Alert>}

        <h1>Publications from Dr Alok Dubey </h1>
        <hr />
        {Publications?.map((e) => (
          <Item
            link={e.link}
            id={e.id}
            author={e.author}
            key={e.id}
            heading={e.name}
          />
        ))}
      </div>
      <Link
        to={`/publications/${Offset - 1}`}
        className="btn btn-sm btn-danger back-publ"
      >
        ←Back
      </Link>
      <Link
        to={`/publications/${Offset + 1}`}
        className="btn btn-sm btn-danger next-publ"
      >
        Next→
      </Link>
    </div>
  );
}
//const minimum_words:number=0
//const maximum_words:number=20
function Item(props) {
  return (
    <>
      <div className="blog-item my-2 mx-2">
        <h4 className="mx-3">{props.heading.toUpperCase()}</h4>
        <h4 className="mx-3">{props.id}</h4>
        <h4 className="mx-3">{props.author}</h4>
        <h4 className="mx-3">{props.link}</h4>
        {/* <p className="mx-3">{props.text.slice(minimum_words,maximum_words)}</p> */}
      </div>
      <hr />
    </>
  );
}
