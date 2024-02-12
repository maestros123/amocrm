module.exports = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://stepanpishchelev.amocrm.ru/api/:path*',
            },
        ];
    },
};