const express = require('express');
const router = express.Router();
const dbcontroller = require('./dbcontroller')


/* GET home page. */
router.get('/', function(req, res, next) {
    const dbcontroller = require('./dbcontroller')
    res.render('index.hbs', { title: 'Express' });
//    getOrders();
    
});

module.exports = router;
