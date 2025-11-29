const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: process.env.database_host,
  user: process.env.database_user,
  database: process.env.database_name,
  password: process.env.database_pwd,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit : 0
});

module.exports = { pool : pool.promise() };