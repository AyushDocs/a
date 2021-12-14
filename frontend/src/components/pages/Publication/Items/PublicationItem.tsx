/** @format */

import React from 'react';
import { papaimg } from '../../Home';
export interface Props {
	name: string;
	imgUrl: string;
	link: string;
}
const PublicationItem = (props: React.PropsWithChildren<Props>) => {
	const { name, imgUrl, link } = props;
	const addUserPublications: React.ReactEventHandler<HTMLAnchorElement> = async e => {
		const options: RequestInit = { method: 'POST', credentials: 'include' };
		await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/user/users/${link}`, options);
	};
	return (
		<div className='card my-2'>
			<img src={papaimg} className='card-img-top' height='200' alt='' />
			{/* <img src={imgUrl} className='card-img-top' alt='' /> */}
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
