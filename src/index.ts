import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import { router } from './services/router.service.js';

const hostname = '127.0.0.1';
const PORT = Number(process.env.PORT ?? 3000);

const server = http.createServer()
    .on('request', (request, response) => {
        router(request, response);
    })

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});