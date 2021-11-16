import React from 'react'
import { Link } from 'react-router-dom'
import { PublicationType } from '../../enums/PublicationType'
import Publication from '../Publication'
const AdminPublications = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <Link  to="/admin/publication" className="btn btn-outline-warning my-2">Add a publication</Link>
            </div>
            <Publication type={PublicationType.UPDATE}/>
        </div>
    )
}

export default AdminPublications
