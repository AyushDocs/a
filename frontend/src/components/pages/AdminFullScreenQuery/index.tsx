/** @format */

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../../axios';
import { AlertContext } from '../../../context/AlertContext';
interface Data {
	date: number;
	email: string;
	query: string;
}
export const FullScreenQuery = () => {
	const [Data, setData] = useState<Data>();
	const navigate = useNavigate();
	const context = useContext(AlertContext);
	const id = useParams().id ?? '';
	useEffect(() => {
		axios.get(`/api/query/${id}`).then(res => setData(res.data));
	}, [id]);
	const deleteQuery = () => {
		if (!context) return;
		context.setUndo(false);
		context.setText('Deleted Query');
		context.setTimeToDisappear(6000);
		context.setOnComplete(() => () => axios.delete(`/api/auth/admin/query/${id}`));
		context.setShowCheck(true);
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
