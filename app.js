const http = require('http');
const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>This is Add Product route</h1>');
});

app.use('/', (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>This is home route</h1>');
})

// NOTE: Express app object will handle both like creating server as well as listening to it
app.listen(3000);