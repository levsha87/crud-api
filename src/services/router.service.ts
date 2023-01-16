import { users, createUser, getUserById, updateUser, deleteUser } from '../db.js';
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
                break;
            case 'POST':
                try {
                    const postData = JSON.parse(await getRequestData(request));
                    createUser(postData.username, postData.age, postData.hobbies);
                    response.statusCode = 201;
                    response.end();
                } catch (err) {
                    const error = err as Error;
                    response.statusCode = setErrorCode(error.message);
                    response.end(JSON.stringify({ message: error.message }));
                }
                break;
        }
    } else if (request.url?.startsWith('/api/users/') && request.url?.split('/')[2]) {
        switch (request.method) {
            case 'GET':
                try {
                    const user = getUserById(request.url?.split('/')[3]);
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify({
                        data: user,
                    }));
                } catch (err) {
                    const error = err as Error;
                    response.statusCode = setErrorCode(error.message);
                    response.end(JSON.stringify({ message: error.message }));
                }
                break;
            case 'PUT':
                try {
                    const postData = await getRequestData(request);
                    updateUser(request.url?.split('/')[3], postData);
                    response.statusCode = 200;
                    response.end();
                } catch (err) {
                    const error = err as Error;
                    response.statusCode = setErrorCode(error.message);
                    response.end(JSON.stringify({ message: error.message }));
                }
                break;
            case 'DELETE':
                try {
                    deleteUser(request.url?.split('/')[3]);
                    response.statusCode = 204;
                    response.end();
                } catch (err) {
                    const error = err as Error;
                    response.statusCode = setErrorCode(error.message);
                    response.end(JSON.stringify({ message: error.message }));
                }
                break;
        }
    } else {
        response.statusCode = 404
        response.write("Page not found. Please, check that the information you entered is correct.")
        response.end()
    }
}

function setErrorCode(msg:string) {
    switch (msg) {
        case 'UserId is invalid':
            return 400;
        case "Record with id === userId doesn't exist":
            return 404;
    }
    return 500;
}