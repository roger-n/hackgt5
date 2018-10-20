const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

module.exports = router;
