const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbcontroller = require('./dbcontroller');


dbcontroller.verifyUser('root', 'password', function(results){
    const list = results;
    console.log(list);
});
// dbcontroller.enqueueOrder(1, 'Smith', '34B', function (results) {
//     const list = results;
//     console.log(list);
// })
let food = [];
/* GET home page. */

    router.get('/', function(req, res, next) {
        // dbcontroller.addItem('Pepsi', 0.50, 'Beverage', function(results){
        //     const list = results;
        //     console.log(list);
        // });

        dbcontroller.getOrders(function(results){
            const list = results;
            //console.log(list);
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
    dbcontroller.getItemsInCategory(req.params.itemid, results=>{
        food = results;
        console.log(food);
        console.log(results)
        console.log("Type",typeof(food));
        return res.json({results})
    })
});

module.exports = router;
