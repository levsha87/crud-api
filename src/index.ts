import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import { users } from './db.js';

const hostname = '127.0.0.1';
const PORT = Number(process.env.PORT ?? 3000);

const server = http.createServer()
    .on('request', (request, response) => {
        switch (request.url) {
            case '/api/users':
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    data: users,
                }));

                break;
            case '/api/users':
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    data: 'Hello User!',
                }));
            
            break;
        
            default:
                response.statusCode = 400
                response.write("No Response")
                response.end()
        }
    })



server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});