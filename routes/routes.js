const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const dbcontroller = require('./dbcontroller');


// isValid = dbcontroller.verifyUser('root','passwprd', result=>
// {
//     console.log(result);
//     if (isValid) {
//         console.log('true');
//     } else {
//         console.log('false');
//     }
// });

//
// const isValid = dbcontroller.verifyUser('root', 'password', function (results) {
//     console.log(typeof (results));
//     console.log(results);
// })
// console.log(isValid)



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
        let names = []
        let orders = dbcontroller.getOrders(function(results){
            console.log(results);

            var x;
           for (let i = 0; i < results.length-1;i++){
               element = results[i];


                // element = JSON.stringify(element);
                // x = Object.assign({}, JSON.parse(element));
                dbcontroller.getItemFromID(element.item_id, function(element){
                    names.push(element.item_name);
                });
            }});
        console.log(names);
        res.render('queue.hbs',{title:'Express', orders:orders,names:names});
    }
);
router.post('/queue',(req,res)=>
{

   dbcontroller.dequeueOrder().then(event=>{
       console.log("Successfully removed from queue")
   })
    res.render('queue.hbs')
});

router.get('/logout',(req,res)=>
{
   res.redirect('/')
});

module.exports = router;
