/**
 * This is a page which user/customer can visit
 * 
 */

const express = require('express');

const router = express.Router(); // this is a mini express app which will handles the routing of app


router.get('/', (req, res, next) => {
    res.send('<h1>This is home route</h1>');
});

module.exports = router;