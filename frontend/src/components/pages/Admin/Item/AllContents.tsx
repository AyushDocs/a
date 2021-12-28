/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import ReactImage from '../../../Image';
import { papaimg } from '../../Home';
interface Props{
	name:string, imgUrl:string, id:number
}
const PublicationItem:React.FC<Props> = (props) => {
	const { name, imgUrl, id } = props;
	return (
		<div className='col-md-4 bg-light my-2'>
			<ReactImage src={papaimg} className='card-img-top' height='200' alt='' />
			{/* <ReactImage src={imgUrl} className='card-img-top' alt='' /> */}
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
