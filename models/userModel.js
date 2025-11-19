const { pool } = require('../database/connect_db.js');

const createUserTable = async() => {
    const userTableSQL = `
        CREATE TABLE IF NOT EXISTS user (
        user_id varchar(50),
        user_name varchar(50),
        password varchar(50)
        );`;
    try {
        let [result] = await pool.query(userTableSQL);
        return result;
    }
    catch(err) {
        console.log("Error in creating userTable");
        throw err;
    }
}

module.exports = { createUserTable };