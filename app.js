const http = require('http');
const express = require('express');

const app = express();  // creates an express application

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
})