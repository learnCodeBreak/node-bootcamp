const Product = require('../models/product');
// const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
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
  Product.fetchAll()
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

  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(console.log);
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product
    .findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(console.log);
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
      .then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      })
      .catch(console.log);
}

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ['products'] })
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(console.log);
// }

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;

//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           return order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           )
//         })
//         .catch(console.log);
//     })
//     .then(result => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(result => {
//       res.redirect('/orders');
//     })
//     .catch(console.log);
// }

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      console.log("Product deleted from cart succesfully");
      res.redirect('/cart');
    })
    .catch(console.log);
}