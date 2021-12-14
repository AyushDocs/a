/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { papaimg } from '../../Home';
export interface Props {
	name: string;
	imgUrl: string;
	id: string;
}
const PublicationItem = (props: React.PropsWithChildren<Props>) => {
	const { name, imgUrl, id } = props;
	return (
		<div className='col-md-4 bg-light my-2'>
			<img src={papaimg} className='card-img-top' height='200' alt='' />
			{/* <img src={imgUrl} className='card-img-top' alt='' /> */}
			<div className='card-body'>
				<h3 className=' card-title'>{name}</h3>
				<Link to={`/admin/publications/${id}`} className='btn btn-primary btn-sm'>
					Read More
				</Link>
			</div>
		</div>
	);
};

export default PublicationItem;
