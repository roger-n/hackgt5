const mysql = require('mysql');

const dbconfig = {
    server: "localhost",
    database: "hackgt5",
    user: "root",
    password: "password",
    port: 3306
};
const conn = mysql.createConnection(dbconfig);
conn.connect();
//fetch array of orders in JSON format
function getOrders(callback){

    conn.query('SELECT * FROM orders', function (error, results, fields) {
    if (error) {
        conn.on('error', function (err) {
            console.log("[mysql error]", err);
        });
    }
    results = JSON.stringify(results);
    results = JSON.parse(results);

    if(callback) callback(results)
});
}

//get item in JSON format based on ID
function getItemFromID (item_id, callback) {

    conn.query('SELECT * FROM items WHERE item_id=' + item_id, function (error, results, fields) {
        if (error) {
            conn.on('error', function (err) {
                console.log("[mysql error]", err);
            });
        }
        results[0] = JSON.stringify(results);
        results[0] = JSON.parse(results);

        if (callback) callback(results[0])
    });
}

//fetch id of item for the order based on the order id
function getOrderItemID(order_id, callback){

    conn.query('SELECT item_id FROM orders WHERE order_id=' + order_id, function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }
        results = JSON.stringify(results);
        results =  JSON.parse(results);

        if(callback) callback(results[0].item_id)
    });
}

//fetch items in the category ('Snack','Entree','Beverage')
function getItemsInCategory (category, callback){

    conn.query('SELECT * FROM items WHERE category=\'' + category + '\'', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }
        results = JSON.stringify(results);
        results =  JSON.parse(results);

        if(callback) callback(results);
    });
}

//Add to queue (highest numbers taken care of last)
function enqueueOrder (item_id, last_name, seat_number, callback) {

    conn.query('INSERT INTO orders (item_id, last_name, seat_number) VALUES (\'' + item_id + '\',\'' + last_name + '\',\'' + seat_number + '\')', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback('Enqueue Successful.')
    });
}

//Remove first order in queue
function dequeueOrder (callback) {

    conn.query('DELETE FROM orders ORDER BY order_id ASC LIMIT 1', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback('Dequeue Successful.')
    });
}



//Add item to menu (only used for setup (and practically flight attendants)
function addItem (item_name, item_price, category, callback) {

    conn.query('INSERT INTO items (item_name, item_price, category) VALUES (\'' + item_name + '\',\'' + item_price + '\',\'' + category + '\')', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback('Added ' + item_name + ' Successfully.')
    });
}

//Check for existence of a user with the u/p combination. returns true if yes, no if false
function verifyUser (username, password, callback) {

    conn.query('SELECT * FROM users WHERE username=\'' + username + '\' AND password=\'' + password + '\'', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback(results.length > 0)
    })
}

module.exports = {
    getOrders,
    getOrderItemID,
    getItemsInCategory,
    enqueueOrder,
    dequeueOrder,
    getItemFromID,
    addItem,
    verifyUser
}


//EXAMPLE OF HOW TO USE DBCONTROLLER

/*
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const dbcontroller = require('./dbcontroller');

router.get('/', function(req, res, next) {

    dbcontroller.getOrders(function(results){
        const list = results;
        console.log(list);
    });

    dbcontroller.getItemID(1, function(results){
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
        qconsole.log(list);
    })

    dbcontroller.getItemFromID(1, function(results) {
        const list = results;
        console.log(list);
    });

    dbcontroller.addItem('Pepsi', 0.50, 'Beverage', function(results){
        const list = results;
        console.log(list);
    });

    dbcontroller.verifyUser('root', 'password', function(results){
        const list = results;
        console.log(list);
    });

    res.render('index.hbs', { title: 'Express' });

    res.render('index.hbs', { title: 'Express' });
});

module.exports = router;

 */
