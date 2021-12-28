/** @format */

const { createProxyMiddleware } = require('http-proxy-middleware');

const middleware = app => app.use(createProxyMiddleware('/api', {target: process.env.REACT_APP_SERVER_URL}))
export default middleware;
