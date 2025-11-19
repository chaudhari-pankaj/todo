const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'todo_manager',
  password: 'hrkrsna#mysql',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit : 0
});

module.exports = { pool : pool.promise() };