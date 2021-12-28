/** @format */

import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
interface Props{ 
	SortBy:string, setSortBy:React.Dispatch<React.SetStateAction<string>> ,
	Checked:boolean, setChecked:React.Dispatch<React.SetStateAction<boolean>> ,
	isPublicationPage:boolean, setIsPublicationPage:React.Dispatch<React.SetStateAction<boolean>> 
}
const AdminHeader:React.FC<Props> = ({ SortBy, setSortBy, Checked, setChecked, isPublicationPage, setIsPublicationPage }) => {
	const handleChange = (e:ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value);
	return (
		<>
			{/* search bar */}
			<div className='d-flex my-2'>
				<button className='btn btn-outline-danger mx-5' onClick={() => setIsPublicationPage(p => !p)}>
					{isPublicationPage ? 'Query' : 'Publications'}
				</button>
				{isPublicationPage && (
					<Link to='/admin/publications/create' className='btn btn-outline-warning mx-5'>
						Add Another <b>+</b>
					</Link>
				)}
			</div>
			<div className='d-flex mt-3'>
				<select className='form-control me-2 width-30 justify-content-center' value={SortBy} onChange={handleChange}>
					<option value='date'>Sort By...</option>
					<option value='date'>date</option>
					<option value='id'>id</option>
					<option value='query'>query</option>
					<option value='email'>email</option>
				</select>
				<div className='form-check no-border width-30 form-switch form-control'>
					<label className='form-check-label ' htmlFor='flexSwitchCheckDefault'>
						<b>Reverse Content</b>
					</label>
					<input className='form-check-input' onChange={() => setChecked(!Checked)} type='checkbox' role='switch' />
				</div>
				<button className='btn btn-sm btn-secondary' type='submit'>
					Search
				</button>
			</div>
		</>
	);
};

export default AdminHeader;
