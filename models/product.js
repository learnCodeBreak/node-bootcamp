const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const productFilePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(productFilePath, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                console.log(this);
                console.log(JSON.stringify(this));
                updatedProducts[existingProductIndex] = this; 
                fs.writeFile(productFilePath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(productFilePath, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(productFilePath, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }


    static findByID(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(prod => prod.id === id);
            cb(product);
        })
    }
}