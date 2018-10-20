const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

const getOrders = require('./dbcontroller');

/* GET home page. */
router.get('/', function(req, res, next) {

    getOrders(function(results){
        const list = results;
        console.log(list);
    });
    res.render('index.hbs', { title: 'Express' });
});

module.exports = router;
