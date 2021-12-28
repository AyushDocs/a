/** @format */

import { useEffect, useRef, useState } from 'react';
import axios from '../../../../axios';
import { default as Item } from '../../../../Types/Publication';
import Publication from '../Item/AllContents';
interface Data {
	content: Item[];
	last: boolean;
}
const AdminPublications = () => {
	const [Offset, setOffset] = useState(0);
	const [Data, setData] = useState<Data>();
	const backBtn = useRef<HTMLButtonElement>(null);
	const nextBtn = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/publications/?offset=${Offset}&page=6`).then(res => setData(res.data));
	}, [Offset]);
	useEffect(() => {
		if (backBtn.current == null || nextBtn.current == null) return;
		if (Offset === 0) {
			backBtn.current.disabled = true;
		}
		if (Offset !== 0 && backBtn.current.disabled === true) {
			backBtn.current.disabled = false;
		}
		if (Data?.last) {
			nextBtn.current.disabled = true;
		}
		if (!Data?.last && nextBtn.current.disabled === true) {
			nextBtn.current.disabled = false;
		}
	}, [Data?.last, Offset]);
	return (
		<div className='container'>
			<div className='row gx-6'>
				{Data?.content.map(e => (
					<Publication key={e.id} {...e} />
				))}
			</div>
		</div>
	);
};

export default AdminPublications;
