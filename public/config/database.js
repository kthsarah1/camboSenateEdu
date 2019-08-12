var mysql = require('mysql');

var pool = mysql.createPool({
    host: '3.95.159.130',
    port: '3306',
    user: 'admin',
    password: '12345!',
    database: 'edumanage',
    connectionLimit: 150,
    multipleStatements: true
});
exports.getConnection = function (callback) {
    console.log("pool",pool);
    pool.getConnection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        callback(err, conn);
    });
};