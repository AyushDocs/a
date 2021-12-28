import axios from '../../../axios';

const SendOtp=async(password:string, email:string)=> {
    const body= { password, email };
	await axios.post('/api/auth/otp',body);
}

export default SendOtp
