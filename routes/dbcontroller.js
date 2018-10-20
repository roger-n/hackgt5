const mysql = require('mysql');

const dbconfig = {
    server: "localhost",
    database: "hackgt5",
    user: "root",
    password: "password",
    port: 3306
};



async function getOrders(callback){
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    let results = await conn.query('SELECT * FROM orders');
    console.log(results);
    conn.query('SELECT * FROM orders', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }
        console.log(results)
        //return callback(results);
        conn.end();
    });

}




module.exports = getOrders;