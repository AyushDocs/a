/** @format */

import { useEffect, useRef, useState } from 'react';
import Publication from '../Item/AllContents';
interface Item {
	name: string;
	imgUrl: string;
	id: string;
}
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
		let isMounted = true;
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/publications/?offset=${Offset}&page=6`)
			.then(res => {
				if (isMounted) return res.json();
			})
			.then(data => {
				if (isMounted) setData(data);
			})
			.catch(err => console.error(err));
		return () => {
			isMounted = false;
		};
	}, [Offset]);
	useEffect(() => {
		if (Offset === 0 && backBtn.current != null) {
			backBtn.current.disabled = true;
		}
		if (Offset !== 0 && backBtn?.current?.disabled === true) {
			backBtn.current.disabled = false;
		}
		if (Data?.last && nextBtn.current != null) {
			nextBtn.current.disabled = true;
		}
		if (!Data?.last && nextBtn?.current?.disabled === true) {
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
