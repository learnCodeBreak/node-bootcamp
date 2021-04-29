const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');

const mongoConnect = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); // This will expose public folder

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use(errorController.get404);


// Connecting mongodb and listening to server
mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
})