/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Query from '../../../../Types/Query';
const AdminQueryItem: React.FC<Query> = props => {
	const { id, date, query, email } = props;
	const data = { id, date, query, email };
	const dateToDisplay = new Date(date);
	return (
		<div className='card my-3'>
			<div className=' d-flex position-absolute' style={{ justifyContent: 'flex-end', right: '0' }}>
				<span className='badge rounded-pill bg-danger'> {dateToDisplay.toLocaleDateString()} </span>
			</div>
			<div className='card-body'>
				<p className='card-text' style={{ minHeight: 100 }}>
					{query.substr(0, 147)}
					{query.length > 147 && '...'}
				</p>
				<p className='card-text'>
					<small className='text-muted'>
						By {email} at {dateToDisplay.toLocaleTimeString()}
					</small>
				</p>
				<Link to={`/admin/query/${id}`} state={data} className='btn btn-sm btn-dark'>
					Read More
				</Link>
			</div>
		</div>
	);
};
export function AdminItemSkeleton() {
	return (
		<div className='card my-3'>
			<div className=' d-flex position-absolute' style={{ justifyContent: 'flex-end', right: '0' }}>
				<span className='badge skeleton skeleton-loading rounded-pill bg-danger'>&nbsp;</span>
			</div>
			<div className='card-body'>
				<p className='skeleton skeleton-loading card-text'>&nbsp;</p>
				<p className='skeleton skeleton-loading card-text'>
					<small className='text-muted'>&nbsp;</small>
				</p>
				<p className='skeleton skeleton-loading'>&nbsp;</p>
				<Link to={`/admin/query/`} className='btn btn-sm btn-dark skeleton skeleton-loading'>
					&nbsp;
				</Link>
			</div>
		</div>
	);
}
export default AdminQueryItem;
