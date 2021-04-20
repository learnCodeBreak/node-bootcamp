const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(cartFilePath, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the card => Find the existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      // Add new product or increase the quantity of product if found
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct ];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(cartFilePath, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id == id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(cartFilePath, JSON.stringify(updatedCart), err => {
        console.log(err);
      })
    })
  }

  static getCart(cb) {
    fs.readFile(cartFilePath, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    })
  }

}