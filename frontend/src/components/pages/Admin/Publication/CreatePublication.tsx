/** @format */

import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../../redux/reducerHooks';
import { setAll } from '../../../../redux/slices/AlertSlice';
interface DataType {
	name: string;
	description: string;
	imgUrl: string;
	author: string;
	link: string;
}
const initialState: DataType = {
	name: '',
	imgUrl: '',
	description: '',
	author: '',
	link: '',
};
const CreatePublications: React.FC = () => {
	const [Data, setData] = useState<DataType>(initialState);
	const dispatch = useAppDispatch();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setData({ ...Data, [e.target.name]: e.target.value });
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const body = JSON.stringify(Data);
		const options = { body, method: 'POST', headers: { 'Content-Type': 'application/json' } };
		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/publications/`, options);
		if (!res.ok) return dispatch(setAll({ color: 'danger', message: 'Failed to save publication' }));
		dispatch(setAll({ color: 'success', message: 'Saved publication successfully' }));
		navigate(-1);
	};
	return (
		<form className='container my-3' onSubmit={handleSubmit}>
			<input className='form-control mb-3 py-3' value={Data?.name} onChange={handleChange} placeholder='Enter name of Publication' required name='name' />
			<input className='form-control mb-3 py-3' value={Data?.description} onChange={handleChange} placeholder='Enter description of Publication' required name='description' />
			<input className='form-control mb-3 py-3' value={Data?.link} onChange={handleChange} placeholder='Enter url of Publication' type='url' required name='link' />
			<input className='form-control mb-3 py-3' value={Data?.imgUrl} onChange={handleChange} placeholder='Enter url of Publication image' type='url' required name='imgUrl' />
			<input className='form-control mb-3 py-3' value={Data?.author} onChange={handleChange} placeholder='Enter name of authours seperated by ,' required name='author' />
			<div className='d-flex justify-content-between'>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
				<button onClick={() => navigate('/admin/publications')} className='btn btn-danger'>
					Back
				</button>
			</div>
		</form>
	);
};
export default CreatePublications;
