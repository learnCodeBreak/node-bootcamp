const mongodb = require('mongodb');

const MongoCleint = mongodb.MongoClient;

// Example URI to connect mongoDB cluster
// mongodb+srv://node-bootcamp:<password>@cluster0.5j4dk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongodbURI = "mongodb+srv://node-bootcamp:node-bootcamp@cluster0.5j4dk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
  MongoCleint.connect(mongodbURI)
    .then(client => {
      console.log('MongoDB Connected');
      callback(client);
    })
    .catch(console.log);
}

module.exports = mongoConnect;