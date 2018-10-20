const sql = require('mssql');

const dbconfig = {
    server: "localhost",
    database: "hackgt5",
    user: "root",
    password: "password",
    port: 3306
};

function getOrders() {
    const conn = new sql.Connection(dbconfig);

    conn.connect().then(function () {
        const req = new sql.Request(conn);
        req.query("SELECT * FROM orders").then(function(reoordset){
            console.log(recordset);
            conn.close();
        })
            .catch (function (err){
                console.log(err);
                conn.close();
            });

    })
        .catch (function(err) {
            console.log(err);
        })
}

module.exports = getOrders();