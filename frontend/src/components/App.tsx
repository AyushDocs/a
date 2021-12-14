/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Alert } from 'reactstrap';
import ProtectedRoute from '../Authentication/ProtectedAdminRoute';
import AlertState from '../context/AlertContext';
import { useAppDispatch, useAppSelector } from '../redux/reducerHooks';
import { unsetAll } from '../redux/slices/AlertSlice';
import './App.css';
import Check from './Check/Check';
import Footer from './Footer';
import Navbar from './Navbar';
import About from './pages/About';
import Admin from './pages/Admin';
import CreatePublications from './pages/Admin/Publication/CreatePublication';
import EditPublication from './pages/Admin/Publication/EditPublication';
import AdminFull from './pages/AdminFullScreenQuery';
import Home from './pages/Home';
import Login from './pages/Login';
import Publications from './pages/Publication/';
import Signup from './pages/Signup';
export const App: React.FC = () => {
	const { color, showAlert, message } = useAppSelector(state => state.Alert);
	const dispatch = useAppDispatch();
	const onClose = () => dispatch(unsetAll());

	useEffect(() => {
		let id: NodeJS.Timeout;
		if (showAlert) id = setTimeout(() => dispatch(unsetAll()), 6000);
		return () => clearTimeout(id);
	}, [dispatch, showAlert]);

	return (
		<AlertState>
			<div className='App'>
				<Alert color={color} isOpen={showAlert} className='my-0'>
					<div className='d-flex justify-content-between'>
						<span className='alert-text'>{message}</span>
						<button className={`close btn btn-${color} btn-sm`} data-dismiss='alert' aria-label='Close' onClick={onClose}>
							<span aria-hidden='true'>X</span>
						</button>
					</div>
				</Alert>
				<Navbar />
				<Check />
				<div className='body'>
					<Routes>
						<Route path='/' element={<Navigate to='/home' />} />
						<Route path='/home/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/publications/' element={<Publications />} />

						<Route path='/admin/' element={<ProtectedRoute component={Admin} />} />
						<Route path='/admin/query_id/:id' element={<ProtectedRoute component={AdminFull} />} />
						<Route path='/admin/publications/:id' element={<ProtectedRoute component={EditPublication} />} />
						<Route path='/admin/publications/' element={<ProtectedRoute component={() => <Admin ShowPublicationPage={true} />} />} />
						<Route path='/admin/publications/create' element={<ProtectedRoute component={CreatePublications} />} />

						<Route path='*' element={<h1>Page Not Found</h1>} />
					</Routes>
				</div>
				<Footer />
			</div>
		</AlertState>
	);
};

export default App;
