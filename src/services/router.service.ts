import { users, createUser, getUserById } from '../db.js';
import http from 'http';
import { getRequestData } from '../helpers/getRequestData.js';

export async function router(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
    if (request.url === '/api/users') {
        switch (request.method) {
            case 'GET':
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    data: users,
                }));
                return;
            case 'POST':
                try {
                    const postData = JSON.parse(await getRequestData(request));
                    createUser(postData.username, postData.age, postData.hobbies);
                    response.statusCode = 201;
                    response.end();
                } catch (err) {
                    const error = err as Error;
                    console.log("tutek", error.name, error.message);
                    response.statusCode = 400;
                    response.end(JSON.stringify({ message: error.message}));
                }
                return;
            default:
                return;
        }

    } else if (request.url?.startsWith('/api/users/') && request.url?.split('/')[2]) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
            data: getUserById(request.url?.split('/')[3]),
        }));
    } else {
        response.statusCode = 404
        response.write("Page not found. Please, check that the information you entered is correct.")
        response.end()
    }
}
