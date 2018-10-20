const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

const getOrders = require('./dbcontroller');

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
    res.render('index.hbs', { title: 'Express' });
//    getOrders();
    
    var results = getOrders();                              //comment this and the line below it out for testing
    setTimeout(function(){console.log(results);}, 500);
=======
    getOrders(function(results){
        const list = results;
        console.log(list);
    });
    res.render('index.hbs', { title: 'Express' });

>>>>>>> d37aabdbf090bec40676464ede07115cc2e3fdb0

});

module.exports = router;
