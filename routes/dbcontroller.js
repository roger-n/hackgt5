const sql = require('mssql');
const mysql = require('mysql');

const dbconfig = {
    server: "localhost",
    database: "hackgt5",
    user: "root",
    password: "password",
    port: 3306
};

function getOrders() {
    //const conn = new mysql.Connection(dbconfig);
    const conn = mysql.createConnection(dbconfig);

    // conn.connect().then(function () {
    //     const req = new sql.Request(conn);
    //     req.query("SELECT * FROM orders").then(function(reoordset){
    //         console.log(recordset);
    //         conn.close();
    //     })
    //         .catch (function (err){
    //             console.log(err);
    //             conn.close();
    //         });
    //
    // })
    //     .catch (function(err) {
    //         console.log(err);
    //     })

    conn.connect();

    conn.query('SELECT * FROM orders', function (error, results, fields) {
        if (error) throw error;
        //return results;
        console.log(results);
    });

    conn.end();
}

module.exports = getOrders;