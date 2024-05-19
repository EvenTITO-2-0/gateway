const { fixRequestBody } = require('http-proxy-middleware');

const ROUTES = [
    {
        url: '/api/v1',
        auth: true,
        authExceptions: ['/openapi.json', '/docs'],
        hasOpenApi: true,
        proxy: {
            target: process.env.BACKEND_URL,
            changeOrigin: true,
            pathRewrite: {
                [`^/api/v1`]: '',
            },
            pathFilter: ['!/openapi.json', '!/docs'],
            on: {
                proxyReq: fixRequestBody,
            },            
        },
    },
]

exports.ROUTES = ROUTES;