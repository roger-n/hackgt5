const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const dbcontroller = require('./dbcontroller');

/* GET home page. */
router.get('/', function(req, res, next) {

    dbcontroller.getOrders(function(results){
        const list = results;
        console.log(list);
    });

    dbcontroller.getOrderItemID(12, function(results){
        const list = results;
        console.log(list);
    });

    dbcontroller.getItemsInCategory('Beverage', function(results){
        const list = results;
        console.log(list);
    });

    dbcontroller.enqueueOrder(2, 'Johnson', '13D', function(results){
        const list = results;
        console.log(list);
    })

    dbcontroller.dequeueOrder(function (results) {
        const list = results;
        console.log(list);
    })

    dbcontroller.getItemFromID(1, function(results) {
        const list = results;
        console.log(list);
    });

    dbcontroller.addItem('Pepsi', 0.50, 'Beverage', function(results){
        const list = results;
        console.log(list);
    });

    res.render('index.hbs', { title: 'Express' });
});

module.exports = router;
