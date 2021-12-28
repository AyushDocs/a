/** @format */

import React from 'react';
import useIsAuthenticated from '../../../../Authentication/useAuthenticated';
import axios from '../../../../axios';
import ReactImage from '../../../Image';
import { papaimg } from '../../Home';
interface Props {
	name: string;
	imgUrl: string;
	link: string;
}
const PublicationItem: React.FC<Props> = props => {
	const { name, imgUrl, link } = props;
	const auth = useIsAuthenticated();
	const addUserPublications = async () => {
		if (auth) await axios.post(`/api/addUserPubblication/${link}`);
	};
	return (
		<div className='card my-2'>
			<ReactImage src={papaimg} className='card-img-top' height='200' alt='' />
			{/* <ReactImage src={imgUrl} className='card-img-top' alt='' /> */}
			<div className='card-body'>
				<h3 className=' card-title'>{name}</h3>
				<a onClick={addUserPublications} href={link} target='_blank' rel='noreferrer' className='btn btn-primary btn-sm'>
					Read More
				</a>
			</div>
		</div>
	);
};

export default PublicationItem;
