const mongodb = require('mongodb');

const MongoCleint = mongodb.MongoClient;

// Example URI to connect mongoDB cluster
// mongodb+srv://node-bootcamp:<password>@cluster0.5j4dk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongodbURI = "mongodb+srv://node-bootcamp:node-bootcamp@cluster0.5j4dk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  MongoCleint.connect(mongodbURI)
    .then(client => {
      console.log('MongoDB Connected');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;