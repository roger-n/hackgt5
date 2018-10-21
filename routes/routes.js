const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const dbcontroller = require('./dbcontroller');

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
    const urlParse = bodyParser.urlencoded({extended:true})
router.post('/',urlParse,(req,res)=>{
    console.log("Seat",req.body.seat);
    res.redirect('/')

});
/* GET login page. */
router.get('/login', (req,res)=>
{
  res.render('login');
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
    console.log(req.body.user_name);
    console.log(req.body.user_password);
    isValid = dbcontroller.verifyUser(req.body.user_name,req.body.user_password, function(result) {

            const valid = result;
        //console.log(valid);
        if (valid)
            res.redirect('/queue');
        else
            res.redirect('/');
    });



});

router.get('/queue',(req,res)=>
    {
<<<<<<< HEAD
        let orders = [];
        let names = [];
        dbcontroller.getOrders(event=>{
            orders = event;
            event.forEach(element=>{
                names.push(dbcontroller.getItemFromID(element.item_id).item_name, result=>{

                })
            });
            console.log(typeof(orders))
=======
        let orders = dbcontroller.getOrders(results=>{
            return results
>>>>>>> 7fe9bf320f990bda7a668010abd49b77a5733541
        });
        res.render('queue.hbs',{title:'Express', orders:orders,names:names});
    }
);
router.post('/queue',(req,res)=>
{
<<<<<<< HEAD
    dbcontroller.dequeueOrder(function (results) {
        const list = results;
        console.log(list);
    })
=======

   dbcontroller.dequeueOrder().then(event=>{
       console.log("Successfully removed from queue")
   })
>>>>>>> 2b91428df95ce1c00e243e3b5643ec5c54e9b1c6
    res.render('queue.hbs')
});

router.get('/logout',(req,res)=>
{
   res.redirect('/')
});

module.exports = router;
