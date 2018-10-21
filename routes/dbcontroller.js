const mysql = require('mysql');

const dbconfig = {
    server: "localhost",
    database: "hackgt5",
    user: "root",
    password: "password",
    port: 3306
};

//fetch array of orders in JSON format
function getOrders(callback){
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('SELECT * FROM orders', function (error, results, fields) {
    if (error) {
        conn.on('error', function (err) {
            console.log("[mysql error]", err);
        });
    }
    console.log('error', error);
    //console.log('results', results);
    //console.log('fields', fields);
    results = JSON.stringify(results);
    results = JSON.parse(results);

    if(callback) callback(results)
    conn.end();
});
}

//fetch id of item for the order based on the order id
function getOrderItemID(order_id, callback){
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('SELECT item_id FROM orders WHERE order_id=' + order_id, function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback(results[0].item_id)
        conn.end();
    });
}

//fetch items in the category ('Snack','Entree','Beverage')
function getItemsInCategory (category, callback){
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('SELECT * FROM items WHERE category=\'' + category + '\'', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }
        results = JSON.stringify(results);
        results =  JSON.parse(results);

        if(callback) callback(results);
        conn.end();
    });
}

//Add to queue (highest numbers taken care of last)
function enqueueOrder (item_id, last_name, seat_number, callback) {
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('INSERT INTO orders (item_id, last_name, seat_number) VALUES (\'' + item_id + '\',\'' + last_name + '\',\'' + seat_number + '\')', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback('Enqueue Successful.')
        conn.end();
    });
}

//Remove first order in queue
function dequeueOrder (callback) {
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('DELETE FROM orders ORDER BY order_id ASC LIMIT 1', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback('Dequeue Successful.')
        conn.end();
    });
}

//get item in JSON format based on ID
function getItemFromID (item_id, callback) {
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('SELECT * FROM items WHERE item_id=' + item_id, function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }
        results = JSON.stringify(results);
        results = JSON.parse(results);

        if(callback) callback(results[0])
        conn.end();
    });
}

//Add item to menu (only used for setup (and practically flight attendants)
function addItem (item_name, item_price, category, callback) {
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('INSERT INTO items (item_name, item_price, category) VALUES (\'' + item_name + '\',\'' + item_price + '\',\'' + category + '\')', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback('Added ' + item_name + ' Successfully.')
        conn.end();
    });
}

//Check for existence of a user with the u/p combination. returns true if yes, no if false
function verifyUser (username, password, callback) {
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('SELECT * FROM users WHERE username=\'' + username + '\' AND password=\'' + password + '\'', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }

        if(callback) callback(results.length > 0)
        conn.end();
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
