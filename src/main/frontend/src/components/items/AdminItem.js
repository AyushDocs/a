import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/AdminItem.css';
const email='https://mail.google.com/mail/u/0/#inbox';
export default function AdminItem(props) {
   const link=props.isNotLink?props.email:<a href={email}>{props.email}</a>
   const query=props.isNotLink?'Query':<Link to={`/admin/query_id/${props.query_id}`} className="btn btn-dark showFullScreenQuery">{props.query}</Link>
    return (
        <div>
            <div className="row my-row justify-content-around">
                <div className="col-1">{props.number}</div>
                <div className="my-col-2 col">{props.query_id}</div>
                <div className="my-col col-3" styles={{ textAlign: "center" }}>{link}</div>
                <div className="my-col col-4">{query}</div>
                <div className="my-col col"><span>{props.date}</span></div>
            </div>
        </div>
    )
}
