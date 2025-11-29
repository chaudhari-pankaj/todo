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
            console.log("error while trying to add new user");
            throw err;
        }
    }
    catch(err) {
        console.log("error while hashing");
        throw err;
    }
}

const usernameTaken = async(username) => {
    const userSQL = "select * from user where username = ?";
    const placeHolder = [username];
    try {
        const [result] = await pool.query(userSQL,placeHolder);
        if(result.length)
            return true;
        return false;
    }
    catch(err) {
        console.log("error while checking if username is taken");
        throw err;
    }
}

module.exports = { createUserTable, addUser, usernameTaken};