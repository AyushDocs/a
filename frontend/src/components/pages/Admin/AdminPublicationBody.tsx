/** @format */

import React from 'react';
import Publication from '../Publication';
const AdminPublicationBody: React.FC<{ Offset: number }> = ({ Offset }) => {
	return (
		<div className='row gx-6'>
			<Publication/>
		</div>
	);
};
// return <div>Data: <$>{ stream$ }</$></div>

// 	return (
// 		<div className='row gx-6'>
// 			{Data?.content.map(e => (
// 				<Publication key={e.id} {...e} />
// 			))}
// 		</div>
// 	);
// };

export default AdminPublicationBody;
