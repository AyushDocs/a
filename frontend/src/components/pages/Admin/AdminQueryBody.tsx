/** @format */

import React, { useEffect, useState } from 'react';
import AdminItem, { AdminItemProps } from './Item';
import { Data as Type } from './Types';
interface Props {
	SortBy: string;
	Checked: string;
	Offset: number;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLast: React.Dispatch<React.SetStateAction<boolean>>;
	page: number;
}
const AdminQueryBody: React.FC<Props> = ({ SortBy, Checked, Offset, setLoading, page, setIsLast }) => {
	const [Data, setData] = useState<Type>();
	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/admin/query?SortBy=${SortBy}&SortBy=${Checked}&offset=${Offset}&size=${page}`, {})
			.then(res => {
				if (isMounted) return res.json();
			})
			.then(parsedData => {
				if (!isMounted) return;
				setIsLast(parsedData.last);
				setData(parsedData);
			})
			.catch(err => {
				console.log(err.message);
			})
			.finally(() => setLoading(false));
		return () => {
			isMounted = false;
		};
	}, [Checked, Offset, SortBy, page, setIsLast, setLoading]);
	return (
		<>
			{JSON.stringify(Data?.content) === JSON.stringify([]) && (
				<span className='text-center'>
					<h3>
						<b className='goog-font'>No questions for you</b>
					</h3>
				</span>
			)}
			<div className='row'>
				{Data?.content.map((item: AdminItemProps) => {
					return (
						<div key={item.id} className='col-md-4'>
							<AdminItem {...item} />
						</div>
					);
				})}
			</div>
		</>
	);
};
export default AdminQueryBody;
