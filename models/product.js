const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOperation;

    if (this._id) {
      // Update the documents
      dbOperation = db.collection('products').updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: this });
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
}

module.exports = Product;