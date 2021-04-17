/**
 * This is a page which user/customer can visit and get all products
 * This is the root page (homepage)
 */

const express = require('express');
const path = require('path');
const productsController = require('../controllers/products');

const router = express.Router();

// shops ('/') => GET
router.get('/', productsController.getProducts);

module.exports = router;