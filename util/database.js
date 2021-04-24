const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-bootcamp',
  password: '1234567'
});


module.exports = pool.promise();