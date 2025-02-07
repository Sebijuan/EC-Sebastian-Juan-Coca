const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://opendata.aemet.es/opendata/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
        proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_AEMET_API_KEY}`);
      },
    })
  );
};
