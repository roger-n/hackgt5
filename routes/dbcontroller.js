const mysql = require('mysql');

const dbconfig = {
    server: "localhost",
    database: "hackgt5",
    user: "root",
    password: "password",
    port: 3306
};



function getOrders(callback){
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('SELECT * FROM orders', function (error, results, fields) {
        if (error) {
            conn.on('error', function(err) {
                console.log("[mysql error]",err);
            });
        }
        callback(results)
        //console.log(results)
        //return callback(results);
        conn.end();
    });

}




module.exports = getOrders;