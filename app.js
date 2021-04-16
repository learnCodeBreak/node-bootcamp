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
    res.send('<h1>Hello from Express!, res.send() method is an utility function provided by Express</h1>')
})

// NOTE: Express app object will handle both like creating server as well as listening to it
app.listen(3000);