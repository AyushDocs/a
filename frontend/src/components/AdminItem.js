import React from "react";
import { Link } from "react-router-dom";
const email = "https://mail.google.com/mail/u/0/#inbox";
export default function AdminItemImpl(props) {
  const data = {
    id: props.query_id,
    date: props.date,
    query: props.query,
    email: props.email
  };
  const link = props.isNotLink ? (
    props.email
  ) : (
    <a target="_blank" rel="noreferrer" href={email}>
      {props.email}
    </a>
  );
  const query = props.isNotLink ? (
    "Query"
  ) : (
    <Link
      to={{ pathname: `/admin/query_id/${data.id}`, state: data }}
      className="btn btn-dark showFullScreenQuery"
    >
      {props.query.substr(0, 26) + "..."}
    </Link>
  );
  return (
    <div className="grey-bg-hover">
      <div className="row my-row justify-content-around">
        <div className="col-1">{props.number}</div>
        <div className="my-col-2 col">{props.query_id}</div>
        <div className="my-col col-3" style={{ textAlign: "center" }}>
          <a target="_blank" rel="noreferrer" href={email}>
            {link}
          </a>
        </div>
        <div className="my-col col-4">{query}</div>
        <div className="my-col col">
          <span>{props.date}</span>
        </div>
      </div>
    </div>
  );
}
