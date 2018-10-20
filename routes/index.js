const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

const getOrders = require('./dbcontroller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.hbs', { title: 'Express' });
<<<<<<< HEAD
//    getOrders();
    
=======
    var results = getOrders();                              //comment this and the line below it out for testing
    setTimeout(function(){console.log(results);}, 500);

>>>>>>> d1969089f86677a64b8754d8b4edd3e7f7aeccc5
});

module.exports = router;
