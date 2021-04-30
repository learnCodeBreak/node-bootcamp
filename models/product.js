const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation;

    if (this._id) {
      // Update the documents
      dbOperation = db.collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      // Insert the documents
      dbOperation = db.collection('products').insertOne(this)
    }
    return dbOperation
      .then(result => {
        console.log(result);
      })
      .catch(console.log);
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(console.log);
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectID(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(console.log)
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectID(prodId) })
      .then(result => {
        console.log('Deleted Successfully');
      })
      .catch(console.log);
  }
}

module.exports = Product;