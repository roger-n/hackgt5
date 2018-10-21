const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbcontroller = require('./dbcontroller');



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

router.get('/item/:itemid',(req,res)=>
{
    console.log(req.params.itemid);
    dbcontroller.getItemsInCategory(req.params.itemid, results=>{
        food = results;
        console.log(food);
        console.log(results);
        console.log("Type",typeof(food));
        res.render('index.hbs',{title:'Express',food:food})
    })
});

router.post('/login',(req,res)=>
{
    isValid = dbcontroller.verifyUser(req.body.user_name,req.body.user_password, result=>
    {
     console.log(result);
    });
    if (isValid) {
        console.log('valid');
        res.redirect('/queue');
    }

    else
        res.redirect('/');
});

router.get('/queue',(res,req)=>
    {
        let orders = {};
        dbcontroller.getOrders(event=>{
            orders = event;
        });
        res.render("queue",{orders});
    }
);
router.post('/queue',(req,res)=>
{
   dbcontroller.dequeueOrder().then(event=>{
       console.log("Successfully removed from queue")
   })
    res.render('/queue')
});

router.get('/logout',(req,res)=>
{
   res.redirect('/')
});

module.exports = router;
