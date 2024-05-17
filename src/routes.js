const ROUTES = [
    {
        url: '/api/v1',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: process.env.BACKEND_URL,
            changeOrigin: true,
            pathRewrite: {
                [`^/api/v1`]: '',
            },
        }
    }
]

exports.ROUTES = ROUTES;