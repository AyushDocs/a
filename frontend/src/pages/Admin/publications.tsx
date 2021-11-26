import React from 'react'
import { Link } from 'react-router-dom'
import { PublicationType } from '../../enums/PublicationType'
import Publication from '../Publication'
const AdminPublications = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-end">
                <Link  to="/admin/publication" className="btn btn-outline-warning my-2"><b>+</b></Link>
            </div>
            <Publication type={PublicationType.UPDATE}/>
        </div>
    )
}

export default AdminPublications
