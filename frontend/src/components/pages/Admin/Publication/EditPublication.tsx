/** @format */

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/reducerHooks';
import { setAll } from '../../../../redux/slices/AlertSlice';
const initialState = {
	name: '',
	imgUrl: '',
	description: '',
	author: '',
	link: '',
};
const EditPublications= () => {
	const [Data, setData] = useState(initialState);
	const [method, setMethod] = useState<string>()
	const id= useParams().id;
	const handleChange = (e:ChangeEvent<HTMLInputElement>) => setData({ ...Data, [e.target.name]: e.target.value });
	useEffect(() => {
		let isMounted = true;
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/publications/${id}`)
			.then(res => {
				if (isMounted) return res.json();
			})
			.then(data => {
				if (isMounted) setData(data);
			});
		return () => {
			isMounted = false;
		};
	}, [id]);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const handleSubmit = async (e:FormEvent) => {
		e.preventDefault();
		const body = method === 'PUT' ? JSON.stringify(Data) : null;
		const options = { body, method, headers: { 'Content-Type': 'application/json' } };
		const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/publications/${id}`, options);

		if (method === 'DELETE') {
			if (!res.ok) return dispatch(setAll({ color: 'danger', message: 'Failed to delete publication' }));
			dispatch(setAll({ color: 'success', message: 'Successfully deleted publication' }));
			navigate(-1);
		} else {
			if (!res.ok) return dispatch(setAll({ color: 'danger', message: 'Failed to update publication' }));
			dispatch(setAll({ color: 'success', message: 'Successfully updated publication' }));
			navigate(-1);
		}
	};
	return (
		<form className='container my-3' onSubmit={handleSubmit}>
			<input className='form-control mb-3 py-3' onChange={handleChange} value={Data.name} placeholder='Enter name of Publication' required name='name' />
			<input className='form-control mb-3 py-3' onChange={handleChange} value={Data.description} placeholder='Enter description of Publication' required name='description' />
			<input className='form-control mb-3 py-3' onChange={handleChange} value={Data.link} placeholder='Enter url of Publication' type='url' required name='link' />
			<input className='form-control mb-3 py-3' onChange={handleChange} value={Data.imgUrl} placeholder='Enter url of Publication image' type='url' required name='imgUrl' />
			<input className='form-control mb-3 py-3' onChange={handleChange} value={Data.author} placeholder='Enter name of authours seperated by ,' required name='author' />
			<div className='d-flex justify-content-between'>
				<button onClick={() => setMethod('PUT')} type='submit' className='btn btn-success'>
					Submit
				</button>
				<button onClick={() => setMethod('DELETE')} type='submit' className='btn btn-danger'>
					Delete
				</button>
				<button onClick={() => navigate('/admin/publications')} type='button' className='btn btn-primary'>
					Back
				</button>
			</div>
		</form>
	);
};
export default EditPublications;
