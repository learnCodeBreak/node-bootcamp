const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(result => {
      console.log('Product Added Successfully');
      res.redirect('/admin/products');
    })
    .catch(console.log);
}

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }

//   let prodId = req.params.productId;

//   req.user
//     .getProducts({ where: { id: prodId } })
//     // Product.findByPk(prodId)
//     .then(products => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect('/');
//       }

//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     }).catch(console.log)
// }

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;

//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   Product.findByPk(prodId)
//     .then(product => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDesc;

//       // to avoid the next level chaning for save() promise we can return the save() promise
//       // so that we can resolve or reject save() promise in same chain
//       return product.save();
//     })
//     .then(result => {
//       console.log('Product updated successfully');
//       res.redirect('/admin/products');
//     })
//     .catch(console.log)
// }

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     // Product.findAll()
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products'
//       });
//     }).catch(console.log)
// }

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then(product => {
//       return product.destroy();
//     })
//     .then(result => {
//       console.log('Product deleted successfully');
//       res.redirect('/admin/products');
//     })
//     .catch(console.log)
// }