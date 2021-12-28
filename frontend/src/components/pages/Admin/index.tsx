/** @format */

import { useState } from 'react';
import { Spinner } from 'reactstrap';
import AdminHeader from './AdminHeader';
import AdminPublicationBody from './AdminPublicationBody';
import AdminQueryBody from './AdminQueryBody';
const page = 6;
interface Props {
	ShowPublicationPage: boolean;
}
const Admin: React.FC<Props> = ({ ShowPublicationPage: showPage }) => {
	const [SortBy, setSortBy] = useState('date');
	const [Checked, setChecked] = useState(false);
	const [Offset, setOffset] = useState(0);
	const [isLast, setIsLast] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [ShowPublicationPage, setShowPublicationPage] = useState(showPage ?? false);
	console.log('in component');

	return (
		<div className='container'>
			<AdminHeader setIsPublicationPage={setShowPublicationPage} isPublicationPage={ShowPublicationPage} {...{ SortBy, setSortBy, Checked, setChecked }} />
			{Loading && <Spinner />}
			{ShowPublicationPage || <AdminQueryBody {...{ SortBy, Checked, Offset, setLoading, page, setIsLast }} />}
			{ShowPublicationPage && <AdminPublicationBody Offset={0} />}
		</div>
	);
};
export default Admin;
