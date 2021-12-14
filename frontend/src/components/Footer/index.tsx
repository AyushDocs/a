/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
	return (
		<footer className='text-center text-white bg-dark'>
			<div className='container p-4'>
				<section className='mb-4'>
					<p>
						<strong>Email Me: dentaalok@gmail.com</strong>
					</p>
				</section>
				<section>
					<div className='row'>
						<h5 className='text-uppercase'>Links</h5>
						<ul className='list-unstylesd mb-0 row '>
							<li className='col-md-4'>
								<Link to='/' className='text-white'>
									Home
								</Link>
							</li>
							<li className='col-md-4'>
								<Link to='/about' className='text-white'>
									{' '}
									About
								</Link>
							</li>
							<li className='col-md-4'>
								<Link to='/publications' className='text-white'>
									View Publications
								</Link>
							</li>
						</ul>
					</div>
				</section>
			</div>
			<div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
				© 2022 Copyright
			</div>
		</footer>
	);
}
