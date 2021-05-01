/**
 * This is a page which only accessed by admin
 * This page will perform CRUD operation
 */

const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-preoduct => GET
router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.getAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);


// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;