/** @format */

import { useState } from 'react';
import { Spinner } from 'reactstrap';
import AdminHeader from './AdminHeader';
import AdminPublicationBody from './AdminPublicationBody';
import AdminQueryBody from './AdminQueryBody';
import PageHandler from './PageHandler';
import { Data } from './Types';
const page = 6;
export const initialState: Data = {
	content: [],
	last: false,
};
const Admin: React.FC<{ ShowPublicationPage?: boolean }> = ({ ShowPublicationPage: showPage }) => {
	const [SortBy, setSortBy] = useState('date');
	const [Checked, setChecked] = useState<string>('ASC');
	const [Offset, setOffset] = useState(0);
	const [isLast, setIsLast] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [ShowPublicationPage, setShowPublicationPage] = useState(showPage ?? false);
	return (
		<div className='container'>
			<AdminHeader setIsPublicationPage={setShowPublicationPage} isPublicationPage={ShowPublicationPage} {...{ SortBy, setSortBy, Checked, setChecked }} />
			{Loading && <Spinner />}
			{ShowPublicationPage || <AdminQueryBody {...{ SortBy, Checked, Offset, setLoading, page, setIsLast }} />}
			{ShowPublicationPage && <AdminPublicationBody Offset={0} />}
			<PageHandler {...{ Offset, setOffset, isLast }} />
		</div>
	);
};
export default Admin;
/**{Loading && (
				<div className='row'>
					{[1, 2, 3, 4, 5, 6].map(item => (
						<div key={item} className='col-md-4'>
							<AdminItemSkeleton />
						</div>
					))}
				</div>
			)} */
