import { users, createUser, getUserById, updateUser } from '../db.js';
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
                    response.statusCode = 400;
                    response.end(JSON.stringify({ message: error.message }));
                }
                return;
        }
    } else if (request.url?.startsWith('/api/users/') && request.url?.split('/')[2]) {
        switch (request.method) {
            case 'GET':
                try {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({
                        data: getUserById(request.url?.split('/')[3]),
                    }));
                } catch (err) {
                    const error = err as Error;
                    response.statusCode = 404;
                    response.end(JSON.stringify({ message: error.message }));
                }
                return;
            case 'PUT':
                try {
                    const postData = await getRequestData(request);
                    updateUser(request.url?.split('/')[3], postData);
                    response.statusCode = 200;
                    response.end();
                } catch (err) {
                    const error = err as Error;
                    response.statusCode = 400;
                    response.end(JSON.stringify({ message: error.message }));
                }
                return;
            // case 'DELETE':
            //     try {
            //         const postData = JSON.parse(await getRequestData(request));
            //         createUser(postData.username, postData.age, postData.hobbies);
            //         response.statusCode = 201;
            //         response.end();
            //     } catch (err) {
            //         const error = err as Error;
            //         response.statusCode = 400;
            //         response.end(JSON.stringify({ message: error.message }));
            //     }
            //     return;
        }
    } else {
        response.statusCode = 404
        response.write("Page not found. Please, check that the information you entered is correct.")
        response.end()
    }
}
