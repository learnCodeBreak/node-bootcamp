/**
 * This is a page which only accessed by admin
 * This page will perform CRUD operation
 */

const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-preoduct => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;