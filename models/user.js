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
    const existingCartProductIndex = this.cart.items.findIndex(
      prod => prod.productId.toString() === product._id.toString()
    );

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

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(item => item.productId);

    return db
      .collection('products')
      .find({ _id: { $in: productIds }})
      .toArray()
      .then(products => {
        return products.map(product => {
          return {
            ...product,
            quantity: this.cart.items.find(item => {
              return item.productId.toString() === product._id.toString()
            }).quantity
          };
        });
      })
      // .catch(console.log)
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(
      item => item.productId.toString() !== productId.toString()
    );

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems }}}
      );
  }

  addOrder() {
    const db = getDb();
    
    return db
      .collection('orders')
      .insertOne(this.cart)
      .then(result => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: {items: [] }}}
          );
      });
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