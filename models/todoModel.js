const { pool } = require('../database/connect_db');
const { randomUUID } = require('crypto');

const createTable = async () => {
    const createTableSQL = `CREATE TABLE IF NOT EXISTS todo (
        userid varchar(50) NOT NULL,
        duedate DATE,
        task varchar(30)
        );`;
    try {
        let [result] = await pool.query(createTableSQL);
        return result;
    }
    catch(err) {
        console.log("error creating todo table");
        throw err;
    }
};

const showAllTodos = async () => {
    const showAllTodosSQL = 'SELECT * FROM todo;';
    try {
        let [result] = await pool.query(showAllTodosSQL);
        return result;
    }
    catch(err) {
        console.log("error while retrieving all todos", err);
    }
}

const addTodo = async (newTodo) => {
    const addTodoSQL = `INSERT INTO todo
        (userId,dueDate,task)
        VALUES
        (?,?,?);`
    placeholder = [newTodo.userID,newTodo.dueDate,newTodo.task];
    try {
        let [result] = await pool.query(addTodoSQL,placeholder);
        return result;
    }
    catch(err) {
        console.log("error in adding todo task",err);
    }
};

module.exports = { createTable, showAllTodos , addTodo };