const { createProxyMiddleware } = require('http-proxy-middleware');

const toExport=(app:any)=>{
    app.use(
        createProxyMiddleware('/api',{
                    target: 'http://localhost:8080/' 
                }
            )
    )
}
export default toExport;