const getDb = require('../util/database').getDb;

const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectID

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // cart = {items: [product]};
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
  }

  addToCart(product) {
    const existingCartProductIndex = this.cart.items.findIndex(prod => prod.productId.toString() === product._id.toString());

    let newQuantity = 1;
    let updatedCartItems = [...this.cart.items];

    if (existingCartProductIndex >= 0) {
      newQuantity = this.cart.items[existingCartProductIndex].quantity + 1;
      updatedCartItems[existingCartProductIndex].quantity = newQuantity; 
    } else {
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
    }

    let updatedCart = { items: updatedCartItems };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id)},
        { $set: { cart: updatedCart }}
      );
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({
        _id: new ObjectId(prodId)
      })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(console.log)
  }
}

module.exports = User;