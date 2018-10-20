const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

const dbcontroller = require('./dbcontroller');
<<<<<<< HEAD

=======
>>>>>>> de84f46c5e0c90705f02a729435de54cbf6ccb31

/* GET home page. */
dbcontroller.addItem('Pepsi', 0.50, 'Beverage', function(results){
    const list = results;
    console.log(list);
});
router.get('/', function(req, res, next) {

<<<<<<< HEAD
    dbcontroller.getOrders((results)=>
    {
=======
    dbcontroller.getOrders(function(results){
>>>>>>> de84f46c5e0c90705f02a729435de54cbf6ccb31
        const list = results;
        console.log(list);
    });

    res.render('index', { title: 'Express' });
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
