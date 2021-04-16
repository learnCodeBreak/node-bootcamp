const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));


app.use(adminRoutes);
app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found!</h1>')
})

app.listen(3000);