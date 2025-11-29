const { pool } = require('../database/connect_db.js');
const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

const createUserTable = async() => {
    const userTableSQL = `
        CREATE TABLE IF NOT EXISTS user (
        user_id varchar(50) PRIMARY KEY,
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

const addUser = async(user) => {
    try {
        const password_hash = await bcrypt.hash(user.password,10);
        const addUserSQL = `INSERT INTO user
        (userID,userName,password)    
        VALUES
        (?,?,?);`;
        let placeHolder = [randomUUID(),user.username,password_hash];
        try {
            let result = await pool.query(addUserSQL,placeHolder);
            return result;
        }
        catch(err) {
            console.log("couldn't add the user to database");
            throw err;
        }
    }
    catch(err) {
        console.log("error while hashing");
        throw err;
    }
}
module.exports = { createUserTable, addUser };