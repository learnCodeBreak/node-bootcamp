const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
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
        fs.writeFileSync('message.txt', 'DUMMY DATA');
        res.statusCode = 302;
        res.setHeader('Location', '/'); // Redirect to '/'
        return res.end();
    }
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