/**
 * This is a page which only accessed by admin
 * This page will perform CRUD operation
 */

const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router(); // this is a mini express app which will handles the routing of app


router.get('/admin/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/admin/add-product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;