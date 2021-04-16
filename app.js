/**
 * Express does not parse the body from incoming request
 * So we need body parser to parse body from incoming request and etract data from body
 * Body parser won't be able to parse file, json data etc. For these we need to handle differently
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// this is a middleware which encode url of every request 
// "extended: false" will only allow user defined data in response, it will not allow default express params
// like Content-Type, statusCode etc
app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');  // redirect is an utility function which allows to change the route
})

app.use('/', (req, res, next) => {
    res.send('<h1>This is home route</h1>');
})

// NOTE: Express app object will handle both like creating server as well as listening to it
app.listen(3000);