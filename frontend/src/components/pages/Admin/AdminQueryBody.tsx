/** @format */

import React, { useEffect, useState } from 'react';
import axios from '../../../axios';
import PageHandler from '../../../hooks/PageHandler';
import Query from '../../../Types/Query';
import AdminItem from './Item';
interface Props {
	SortBy: string;
	Checked: boolean;
	Offset: number;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	page: number;
	setIsLast: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Data {
	content: Query[];
	last: boolean;
}
const AdminQueryBody: React.FC<Props> = ({ SortBy, Checked, setLoading, page }) => {
	const [Data, setData] = useState({} as Data);
	const [Offset, setOffset] = useState(0);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`/api/query/?SortBy=${SortBy}&SortBy=${Checked}&offset=${Offset}&size=${page}`)
			.then(res => {
				setData(res.data);
			})
			.finally(() => setLoading(false));
	}, [Checked, Offset, SortBy, page, setLoading]);
	return (
		<>
			{JSON.stringify(Data.content || []) === JSON.stringify([]) && (
				<span className='text-center'>
					<h3>
						<b className='goog-font'>No questions for you</b>
					</h3>
				</span>
			)}
			<div className='row'>
				{Data?.content?.map(item => {
					return (
						<div key={item.id} className='col-md-4'>
							<AdminItem {...item} />
						</div>
					);
				})}
			</div>
			<PageHandler setOffset={setOffset} last={Data?.last} />
		</>
	);
};
export default AdminQueryBody;
