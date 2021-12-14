/** @format */

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertContext } from '../../../context/AlertContext';
interface Data {
	email: string;
	query: string;
	date: string;
}
export const FullScreenQuery = () => {
	const [Data, setData] = useState<Data>();
	const navigate = useNavigate();
	const context = useContext(AlertContext);
	const id: string = useParams().id ?? '';
	useEffect(() => {
		let isMounted = true;
		const options: RequestInit = { credentials: 'include' };
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/query/${id}`, options)
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
	const deleteQuery = () => {
		context?.setUndo(false);
		context?.setText('Deleted Query');
		context?.setTimeToDisappear(6000);
		context?.setOnComplete(() => () => fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/query/${id}`, { method: 'DELETE' }));
		context?.setShowCheck(true);
		navigate('/admin/');
	};
	return (
		<div className='container my-2 form-container form-floating '>
			<input readOnly type='email' value={Data?.query} className='my-3 form-control' />
			<textarea readOnly className='my-4 form-control' value={Data?.email} style={{ height: 100 }}></textarea>
			<input readOnly className='my-3 form-control' value={id} />
			<input readOnly className='my-3 form-control' value={new Date(Data?.date ?? Date.now()).toLocaleDateString() + '  ' + new Date(Data?.date ?? Date.now()).toLocaleTimeString()} />

			<div className='d-flex justify-content-between'>
				<Link to='/admin/' className='btn btn-primary'>
					Back
				</Link>
				<button onClick={deleteQuery} className='btn btn-danger'>
					Delete
				</button>
			</div>
		</div>
	);
};

export default FullScreenQuery;
