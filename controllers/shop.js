const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(console.log);
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(console.log);
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // METHOD - 1
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(console.log);

  // // METHOD -  2
  // Product.findAll({where: {id: prodId}})
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(console.log);
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity;

  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId }});
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      newQuantity = 1;
      // Check for existing product
      if (product) {
        // Increase the quantity in cart-item
        let oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1
        return product;
      }

      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity }});
    })
    .then(result => {
      console.log('Product added to cart successfully');
      res.redirect('/cart');
    })
    .catch(console.log);
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(console.log);
    })
    .catch(console.log);
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
}

exports.postOrder = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          )
        })
        .catch(console.log);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(console.log);
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId }});
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      console.log("Product deleted from cart succesfully");
      res.redirect('/cart');
    })
    .catch(console.log);
}