const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
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

app.use((req, res,next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log)
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// This is a fallback route when router does not match with any path provided by user
app.use(errorController.get404);

// Add one to many relation for a user having multiple (shared) products in a cart
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// Establish the database connection and sync the database to app
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
    // app.listen(3000);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Dhirendra', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    console.log(user);
    app.listen(3000);
  })
  .catch(console.log)