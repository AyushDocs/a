/** @format */

import React, { useEffect, useState } from 'react';
import Publication from './Item/AllContents';
interface Item {
	name: string;
	imgUrl: string;
	id: string;
}
interface Data {
	content: Item[];
	last: boolean;
}
const AdminPublicationBody: React.FC<{ Offset: number }> = ({ Offset }) => {
	const [Data, setData] = useState<Data>();
	useEffect(() => {
		let isMounted = true;
		console.log('created component');

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
	return (
		<div className='row gx-6'>
			{Data?.content.map(e => (
				<Publication key={e.id} {...e} />
			))}
		</div>
	);
};

export default AdminPublicationBody;
