const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
    'https://cozycornerfront.vercel.app',
    'https://cozycorner-delta.vercel.app',
    'http://localhost:3000'
];
export default allowedOrigins;