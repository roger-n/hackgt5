const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

const getOrders = require('./dbcontroller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.hbs', { title: 'Express' });
//    getOrders();
    
    var results = getOrders();                              //comment this and the line below it out for testing
    setTimeout(function(){console.log(results);}, 500);

});

module.exports = router;
