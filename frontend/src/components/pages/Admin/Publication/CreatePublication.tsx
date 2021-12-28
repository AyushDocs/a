/** @format */

import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../../redux/reducerHooks';
import { setAll } from '../../../../redux/slices/AlertSlice';
import Publication from '../../../../Types/Publication';
const initialState: Publication = {
	id: 0,
	name: '',
	author: '',
	link: '',
	description: '',
	imgUrl: '',
	createdDateTime: new Date(1),
};
const CreatePublications = () => {
	const [Data, setData] = useState<Publication>(initialState);
	const dispatch = useAppDispatch();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setData({ ...Data, [e.target.name]: e.target.value });
	const navigate = useNavigate();
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/publications/', Data);
			if (res.status !== 200) return dispatch(setAll({ color: 'danger', message: 'Failed to save publication' }));
			dispatch(setAll({ color: 'success', message: 'Saved publication successfully' }));
			setData(res.data);
			navigate(-1);
		} catch (error) {
			console.log(error);
			dispatch(setAll({ color: 'danger', message: 'Failed to save publication' }));
		}
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
