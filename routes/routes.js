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
router.post('/',(req,res)=>{
    console.log("Post request coming in");
    res.render('login')
});
/* GET login page. */
router.get('/login', (req,res)=>
{
  res.render('login',{});
});

module.exports = router;
