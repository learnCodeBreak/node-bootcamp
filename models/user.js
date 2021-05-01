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
    // const cartProduct = this.cart.items.findIndex(cp => cp._id === product.id);

    let updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: 1 }]};

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