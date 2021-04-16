/**
 * This is a page which only accessed by admin
 * This page will perform CRUD operation
 */

const express = require('express');

const router = express.Router(); // this is a mini express app which will handles the routing of app


router.get('/add-product', (req, res, next) => {
    res.send(
        `<form action="/product" method="POST">
         <input type="text" name="title">
         <button type="submit">Add Product</button>
         </form>`);
});

router.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;