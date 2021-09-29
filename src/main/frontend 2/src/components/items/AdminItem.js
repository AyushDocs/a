import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/AdminItem.css'
const email="dentaalok@gmail.com"
export default function AdminItem(props) {
   const link=props.isNotLink?props.email:<Link to={email}>{props.email}</Link>
   const query=props.isNotLink?'Query':<Link to={`/admin/${props.query_id}`} className="btn btn-dark showFullScreenQuery">{props.query}</Link>
    return (
        <div>
            <div className="row my-row justify-content-around">
                <div className="col-2">{props.number}</div>
                <div className="my-col-3 col">{props.query_id}</div>
                <div className="my-col col" styles={{ textAlign: "center" }}>{link}</div>
                <div className="my-col-2 col-2">{query}</div>
                <div className="my-col col"><span>{props.date}</span></div>
            </div>
        </div>
    )
}
