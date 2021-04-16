/**
 * This is a page which only accessed by admin
 * This page will perform CRUD operation
 */

const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router(); // this is a mini express app which will handles the routing of app

const products = [];

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.products = products;
exports.routes = router;