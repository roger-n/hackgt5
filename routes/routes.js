const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbcontroller = require('./dbcontroller');



// dbcontroller.enqueueOrder(1, 'Smith', '34B', function (results) {
//     const list = results;
//     console.log(list);
// })
let food = ;
/* GET home page. */

    router.get('/', function(req, res, next) {
        // dbcontroller.addItem('Pepsi', 0.50, 'Beverage', function(results){
        //     const list = results;
        //     console.log(list);
        // });

        dbcontroller.getOrders(function(results){
            const list = results;
            console.log(list);
        });

        res.render('index.hbs', { title: 'Express',
        food});
    });
    const urlParse = bodyParser.urlencoded({extended:false})
router.post('/',urlParse,(req,res)=>{
    console.log("Seat",req.body.seat);
    res.redirect('/')

});
/* GET login page. */
router.get('/login', (req,res)=>
{
  res.render('login',{});
});

router.post('/item/:itemid',(req,res)=>
{
    console.log(req.params.itemid);
    dbcontroller.getItemsInCategory(req.params.itemid, food=>{
        this.food = food;
        res.redirect('/')
    })
});

module.exports = router;
