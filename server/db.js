// db.js
const mysql = require('mysql');
const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'solve_this_db'
});

module.exports = connection;
