import http from 'http';

export function getRequestData(req:http.IncomingMessage):Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk:Buffer) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                console.log(body);
                resolve(body);
            });

        } catch (error) {
            reject(error);
        }
    })
}