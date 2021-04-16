const http = require('http');
const express = require('express');

const app = express();  // creates an express application

// NOTE: Middleware is something which procees the request before sending response
app.use((req, res, next) => {
    console.log('In a middleware');
    next(); // This allows the request to continue to next middleware in line
});

app.use((req, res, next) => {
    console.log('In another middleware');
})

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
})  