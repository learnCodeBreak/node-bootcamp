const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Response</title></head>');
    res.write('<body><h1>Hello from Nodejs Server</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
})