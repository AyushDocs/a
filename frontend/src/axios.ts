/** @format */

import axiosLib from 'axios';

const axios = axiosLib.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true,
});

export default axios;
