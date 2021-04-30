const getDb = require('../util/database').getDb;

const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectID

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(prodId) })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(console.log)
  }
}

module.exports = User;