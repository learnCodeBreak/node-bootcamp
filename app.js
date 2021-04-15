const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    console.log('Request Headers: ', req.headers);
    console.log(`Request Raw Headers: ${req.rawHeaders}`);
});

server.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
})