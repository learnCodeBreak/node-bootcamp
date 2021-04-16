const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// This will limit only post request on "/product" route
// So here we are limiting the middleware execution to post method
// And making sure that '/product' route should handle only post request
app.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/', (req, res, next) => {
    res.send('<h1>This is home route</h1>');
})


app.listen(3000);