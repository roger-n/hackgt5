const mysql = require('mysql');

const dbconfig = {
    server: "localhost",
    database: "hackgt5",
    user: "root",
    password: "password",
    port: 3306
};

// function getOrders(callback) {
//     const conn = mysql.createConnection(dbconfig);
//     conn.connect();
//     conn.query('SELECT * FROM orders', function (error, results, fields) {
//         if (error) {
//             throw error;
//             conn.end();
//         }
//         finalData = results;
//         if(callback) callback(finalData);
//         conn.end();
//     });
//     // urllib.request(urlToCall, { wd: 'nodejs' }, function (err, data, response) {
//     //     var statusCode = response.statusCode;
//     //     finalData = getResponseJson(statusCode, data.toString());
//     //     // call the function that needs the value
//     //     callback(finalData);
//     //     // we are done
//     //     return;
//     // });
// }

function getOrders(fn){
    const conn = mysql.createConnection(dbconfig);
    conn.connect();
    conn.query('SELECT * FROM orders', function (error, results, fields) {
        if (error) {
            throw error;
            conn.end();
        }
        fn(results);
        conn.end();
    });
    // geocoder.geocode( { 'address': address}, function(results, status) {
    //     fn(results);
    // });
}

getOrders(function(results){
        return(results); // this is where you get the return value
});

// function getOrders() {
//
//
//     const conn = mysql.createConnection(dbconfig);
//
//     conn.connect();
//
//     return new Promise(function(resolve, reject) {
//             setTimeout(function() {
//             conn.query('SELECT * FROM orders', function (error, results, fields) {
//                 if (error) {
//                     throw error;
//                     conn.end();
//                 } else {
//                     //console.log(results[0]);
//                     return (results[0], function () {
//                         conn.end();
//                     });
//                     conn.end();
//                 }
//
//             });
//         }, 2000);
//     });
//
//
//
//     conn.end();
// }

module.exports = getOrders;