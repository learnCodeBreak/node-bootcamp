const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');

const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); // This will expose public folder

app.use((req, res, next) => {
  User.findById('608dc9691db2f329807fd513') // user id is entered manually
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log);
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use(errorController.get404);


// Connecting mongodb and listening to server
mongoose.connect("mongodb+srv://node-bootcamp:node-bootcamp@cluster0.5j4dk.mongodb.net/shop?retryWrites=true&w=majority")
  .then(reuslt => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'dhirendra',
            email: 'dhirendra@test.com',
            cart: { items: [] }
          })
          user.save();
        }
      })
    app.listen(3000);
  })
  .catch(console.log)