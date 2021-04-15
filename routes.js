const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My First Form</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            // fs.writeFileSync('message.txt', message); // This line will block your code execution
            
            fs.writeFile('message.txt', message, err => {   // This won't block because of asynchronous nature
                if (err) {
                    // handle error here
                    res.statusCode = 500;
                    res.write('There is something wrong while writting file');
                    return res.end();
                }

                res.statusCode = 302;
                res.setHeader('Location', '/'); // Redirect to '/'
                return res.end();
            })
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Response</title></head>');
    res.write('<body><h1>Hello from Nodejs Server</h1></body>');
    res.write('</html>');
    res.end();
}

// Differnt ways to export data from this module
// 1. We can export directlly
// module.exports = requestHandler;

// 2. WE can export with identifier
// module.exports = {
//     handler: requestHandler
// }

// // OR
// module.exports.handler = requestHandler;

// OR
exports.handler = requestHandler;