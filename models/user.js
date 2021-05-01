const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
});

userSchema.methods.addToCart = function (product) {
  const existingCartProductIndex = this.cart.items.findIndex(
    prod => prod.productId.toString() === product._id.toString()
  );

  let newQuantity = 1;
  let updatedCartItems = [...this.cart.items];

  if (existingCartProductIndex >= 0) {
    newQuantity = this.cart.items[existingCartProductIndex].quantity + 1;
    updatedCartItems[existingCartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  let updatedCart = {
    items: updatedCartItems
  };

  this.cart = updatedCart;
  return this.save();
}

module.exports = mongoose.model('User', userSchema);













// const getDb = require('../util/database').getDb;

// const mongodb = require('mongodb');

// const ObjectId = mongodb.ObjectID

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // cart = {items: [product]};
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db
//       .collection('users')
//       .insertOne(this)
//   }

//   addToCart(product) {
//     const existingCartProductIndex = this.cart.items.findIndex(
//       prod => prod.productId.toString() === product._id.toString()
//     );

//     let newQuantity = 1;
//     let updatedCartItems = [...this.cart.items];

//     if (existingCartProductIndex >= 0) {
//       newQuantity = this.cart.items[existingCartProductIndex].quantity + 1;
//       updatedCartItems[existingCartProductIndex].quantity = newQuantity; 
//     } else {
//       updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
//     }

//     let updatedCart = { items: updatedCartItems };

//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id)},
//         { $set: { cart: updatedCart }}
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(item => item.productId);

//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds }})
//       .toArray()
//       .then(products => {
//         return products.map(product => {
//           return {
//             ...product,
//             quantity: this.cart.items.find(item => {
//               return item.productId.toString() === product._id.toString()
//             }).quantity
//           };
//         });
//       })
//       // .catch(console.log)
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       item => item.productId.toString() !== productId.toString()
//     );

//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems }}}
//       );
//   }

//   addOrder() {
//     const db = getDb();

//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name
//           }
//         }

//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: {items: [] }}}
//           );
//       });
//   }

//   getOrder() {
//     const db = getDb();

//     return db
//       .collection('orders')
//       .find({ 'user._id': new ObjectId(this._id) })
//       .toArray() 
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({
//         _id: new ObjectId(prodId)
//       })
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//       .catch(console.log)
//   }
// }

// module.exports = User;