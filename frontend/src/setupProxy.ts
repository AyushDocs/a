/** @format */

const { createProxyMiddleware } = require('http-proxy-middleware');

const toExport = (app: any) => {
	app.use(
		createProxyMiddleware('/api', {
			target: process.env.REACT_APP_SERVER_URL,
		})
	);
};
export default toExport;
