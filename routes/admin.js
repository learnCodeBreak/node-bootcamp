/**
 * This is a page which only accessed by admin
 * This page will perform CRUD operation
 */

const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-preoduct => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;