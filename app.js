const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); // This will expose public folder

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use(errorController.get404);

// Establish the database connection and sync the database to app
sequelize.sync()
  .then(res => {
    console.log(res);
    app.listen(3000);
  }).catch(console.log)