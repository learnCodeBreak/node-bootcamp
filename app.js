const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Connecting with database
db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); // This will expose public folder

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use(errorController.get404);

app.listen(3000);