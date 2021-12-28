/** @format */

import React, { FormEvent, useState } from 'react';
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import Typed, { TypewriterClass } from 'typewriter-effect';
import axios from '../../axios';
import useInput from '../../hooks/useInput';

const typerConfig = { loop: true, deleteSpeed: 25 };
const OnInit = (typewriter: TypewriterClass) => typewriter.typeString('Please Enter your query.').pauseFor(2000).deleteAll().typeString('Dr Alok will reply shortly.').pauseFor(2000).start();
interface Props {
	modal: boolean;
	toggle: () => any;
}
const Form: React.FC<Props> = ({ modal, toggle }) => {
	const [Success, setSuccess] = useState(false);
	const [Failure, setFailure] = useState(false);
	const [email, emailBind, emailReset] = useInput('');
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const reset = () => {
		emailReset();
		setQuery('');
	};
	const onCloseClick = () => {
		toggle();
		reset();
		setFailure(false);
		setSuccess(false);
	};
	const onSubmit = async (e: FormEvent) => {
		setLoading(true);
		e.preventDefault();
		setSuccess(false);
		setFailure(false);
		try {
			const res = await axios.post('/api/query/public/', { query, email });
			if (res.status !== 201) setFailure(true);
			else {
				setSuccess(true);
				reset();
			}
		} catch (error) {
			setFailure(true);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const close = (
		<Button color='danger' onClick={onCloseClick}>
			X
		</Button>
	);
	return (
		<Modal className='modal-scrollable' isOpen={modal} toggle={toggle}>
			<ModalHeader className='bg-dark text-light' toggle={toggle} close={close}>
				<b>
					<Typed options={typerConfig} onInit={OnInit} />
				</b>
			</ModalHeader>
			<ModalBody className='bg-dark text-light'>
				<Alert color='success' isOpen={Success}>
					<div className='d-flex justify-content-between'>
						<span className='alert-text'>Message Sent</span>
						<Button color='dark' className='close btn-sm' data-dismiss='alert' aria-label='Close' onClick={() => setSuccess(false)}>
							<span aria-hidden='true'>X</span>
						</Button>
					</div>
				</Alert>
				<Alert color='danger' isOpen={Failure}>
					<div className='d-flex justify-content-between'>
						<span className='alert-text'>Failed to send message</span>
						<button className='close btn btn-sm btn-danger' data-dismiss='alert' aria-label='Close' onClick={() => setFailure(false)}>
							<span aria-hidden='true'>X</span>
						</button>
					</div>
				</Alert>
				<input type='email' placeholder='Enter your email' {...emailBind} className='form-control my-3 text-dark' required />
				<textarea rows={4} placeholder='Enter your query' value={query} onChange={e => setQuery(e.target.value)} className='form-control my-4' required />
			</ModalBody>
			<ModalFooter className='bg-dark text-light d-flex justify-content-around'>
				{loading && <Spinner />}
				<form onSubmit={onSubmit}>
					<Button className='mx-2' color='primary' onClick={reset}>
						Reset
					</Button>
					<Button className='mx-2' color='secondary' onClick={onCloseClick}>
						Cancel
					</Button>
					<Button className='mx-2' type='submit' color='danger'>
						Send
					</Button>
				</form>
			</ModalFooter>
		</Modal>
	);
};
export default Form;
