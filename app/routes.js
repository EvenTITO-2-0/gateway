const { fixRequestBody } = require('http-proxy-middleware');

const ROUTES = [
    {
        url: '/api/v1',
        auth: true,
        authExceptions: ['/openapi.json', '/docs', '/provider/oauth/callback', /^\/events\/[a-f0-9\-]+\/provider\/webhook\/?$/i, /^\/events\/[a-f0-9\-]+\/provider\/return\/(success|failure|pending)\/?$/i],
        hasOpenApi: true,
        proxy: {
            target: process.env.BACKEND_URL,
            changeOrigin: true,
            pathRewrite: {
                [`^/api/v1`]: '',
            },
            pathFilter: ['!/openapi.json', '!/docs'],
            on: {
                proxyReq: (proxyReq, req, res) => {
                    if (req.body) {
                        const bodyData = JSON.stringify(req.body);
                        proxyReq.setHeader('Content-Type', 'application/json');
                        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                        proxyReq.write(bodyData);
                    }
                },            
            },
        },
    },
]

exports.ROUTES = ROUTES;