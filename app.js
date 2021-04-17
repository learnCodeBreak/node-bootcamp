const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); // This will expose public folder

app.use('/admin', adminData.routes);
app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Not Found',
        // productCSS: false,
        // activeShop: false,
        // activeAddProduct: false
    });
});

app.listen(3000);