const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));    // This will expose public folder

app.set('view engine', 'pug');
app.set('views', 'views');

app.use('/admin',adminData.routes);
app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Not Found'});
});

app.listen(3000);