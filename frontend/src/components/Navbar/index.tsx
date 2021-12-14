/** @format */

import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { logout } from '../../Authentication/Auth';
import { useAppDispatch, useAppSelector } from '../../redux/reducerHooks';
import { setAdminAuthenticated } from '../../redux/slices/AdminIsAuthenticated';
import { toggle } from '../../redux/slices/postModal';
import { setUserAuthenticated } from '../../redux/slices/UserIsAuthenticated';
import Form from '../Form';
export default function Navbar() {
	const dispatch = useAppDispatch();
	const isAdminAuthenticated = useAppSelector(state => state.IsAdminAuthenticated.isAuth) || window.sessionStorage.getItem('authenticated');
	const isUserAuthenticated = useAppSelector(state => state.IsUserAuthenticated.isAuth) || window.sessionStorage.getItem('userAuthenticated');
	const isAuthenticated = isAdminAuthenticated || isUserAuthenticated;
	const togglePost = () => {
		dispatch(toggle());
	};
	const handleLogout = async () => {
		const data = await logout();
		if (!data.success) return;
		dispatch(setUserAuthenticated(false));
		dispatch(setAdminAuthenticated(false));
	};
	const modal = useAppSelector(state => state.postModal.value);
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark container-fluid '>
			<div className='container'>
				<Link className='navbar-brand' aria-current='page' to='/home'>
					AlokMeds
				</Link>
				<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navmenu' aria-controls='navmenu' aria-expanded='false' aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navmenu'>
					<ul className='navbar-nav me-auto ms-auto'>
						<li className='nav-item'>
							<Link className='nav-link' aria-current='page' to='/home'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' aria-current='page' to='/about'>
								About
							</Link>
						</li>
						<li className='nav-item'>
							<span className='nav-link cursor' onClick={togglePost}>
								Contact Me
							</span>
							<Form toggle={togglePost} modal={modal} />
						</li>
						<li className='nav-item'>
							<Link className='nav-link' aria-current='page' to='/publications/'>
								Publications
							</Link>
						</li>
					</ul>
					{isAuthenticated || (
						<ul className='navbar-nav'>
							<li className='nav-item'>
								<Link className='nav-link' aria-current='page' to='/login/'>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' aria-current='page' to='/signup/'>
									Sign up
								</Link>
							</li>
						</ul>
					)}
					<ul className='navbar-nav'>
						{isAdminAuthenticated && (
							<li className='nav-item'>
								<Link className='nav-link' aria-current='page' to='/admin/'>
									Admin Panel
								</Link>
							</li>
						)}
						<span className='nav-item'>
							<button onClick={handleLogout} className='btn btn-primary'>
								Logout
							</button>
						</span>
						{isAuthenticated && (
							<li className='nav-item dropdown'>
								<button id='navbarDropdown' data-bs-toggle='dropdown' aria-expanded='false' className='nav-link dropdown-toggle'>
									Welcome
								</button>
								<ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
									<li>
										<Link to='/' className='dropdown-item'>
											your queries
										</Link>
									</li>
									<li>
										<Link to='/' className='dropdown-item'>
											Change Details
										</Link>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<button onClick={handleLogout} className='dropdown-item'>
											Logout
										</button>
									</li>
								</ul>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
