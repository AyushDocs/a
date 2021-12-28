/** @format */

import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import axios from '../../../axios';
import PageHandler from '../../../hooks/PageHandler';
import useTitle from '../../../hooks/useTitle';
import Page from '../../../Types/Page';
import PublicationType from '../../../Types/Publication';
import PublicationItem from './Items/PublicationItem';
const page = 6;
const Publication = () => {
	const [data, setData] = useState<Page<PublicationType>>();
	const [hasError, setError] = useState(false);
	useTitle('Publications');
	const [Offset, setOffset] = useState(0);
	useEffect(() => {
		axios
			.get(`/api/publications/public/?offset=${Offset}&page=${page}`)
			.then(res => setData(res.data))
			.catch(() => setError(true));
	}, [Offset]);
	return (
		<div className='container'>
			<div className='content my-2'>
				{hasError && <Alert color='danger'>Slow Internet....</Alert>}
				<h1>Publications from Dr Alok Dubey </h1>
				<hr />
				<div className='row'>
					{data?.content?.map(item => (
						<div className='col-md-4' key={item.imgUrl}>
							<PublicationItem {...item} />
						</div>
					))}
				</div>
			</div>
			<PageHandler setOffset={setOffset} last={data?.last ?? true} />
		</div>
	);
};

export default Publication;
