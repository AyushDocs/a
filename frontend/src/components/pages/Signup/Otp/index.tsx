/** @format */

import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import useInput from '../../../../hooks/useInput';
import { useAppDispatch } from '../../../../redux/reducerHooks';
import { setAll } from '../../../../redux/slices/AlertSlice';
import { setUserAuthenticated } from '../../../../redux/slices/UserIsAuthenticated';
import { signup } from './SignupLogic';
interface Props {
	password: string;
	open: boolean;
	email: string;
}
const Otp: React.FC<Props> = ({ password, open, email }) => {
	const [loading, setLoading] = useState(false);
	const [otp, otpBind, otpReset] = useInput('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { success, errorMessage } = await signup(email, otp, password);
			if (!success) return dispatch(setAll({ color: 'danger', message: errorMessage }));
			dispatch(setAll({ color: 'success', message: 'Successfully signed up user' }));
			dispatch(setUserAuthenticated(true));
			setLoading(false);
			navigate('/home');
		} catch (error) {
			dispatch(setAll({ color: 'danger', message: 'Network issues' }));
			setLoading(false);
		}
	};
	return (
		<Modal className='modal-scrollable' isOpen={open}>
			<ModalHeader className='bg-dark text-light'>
				<b>Enter you Otp</b>
			</ModalHeader>
			<ModalBody className='bg-dark text-light'>
				<input type='number' {...otpBind} />
			</ModalBody>
			<ModalFooter className='bg-dark text-light d-flex justify-content-around'>
				{loading && <Spinner />}
				<form onSubmit={handleSubmit}>
					<Button className='mx-2' color='primary' onClick={otpReset}>
						Reset
					</Button>
					<Button className='mx-2' type='submit' color='danger'>
						Send
					</Button>
				</form>
			</ModalFooter>
		</Modal>
	);
};
export default Otp;
